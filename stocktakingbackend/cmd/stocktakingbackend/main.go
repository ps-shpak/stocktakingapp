package main

import (
	"context"
	"fmt"
	"net"
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/gorilla/mux"
	"github.com/grpc-ecosystem/grpc-gateway/runtime"
	"github.com/pkg/errors"
	log "github.com/sirupsen/logrus"
	"google.golang.org/grpc"

	"stocktakingbackend/authorizing"
	"stocktakingbackend/labeling"
	"stocktakingbackend/postgres"
	"stocktakingbackend/redis"
	"stocktakingbackend/server"
	"stocktakingbackend/stock"
	"stocktakingbackend/stocktaking"
	"stocktakingbackend/stocktakingapi"
)

// ServiceGRPCPort - port for GRPC API
const ServiceGRPCPort = ":8081"

// ServiceRESTPort - port for GRPC-Web API
const ServiceRESTPort = ":8082"

func main() {
	logger := &log.Logger{
		Out: os.Stderr,
		Formatter: &log.JSONFormatter{
			DataKey: "context",
		},
		Level: log.InfoLevel,
	}

	googleCreds, err := getGoogleCredentials()
	if err != nil {
		logger.WithError(err).Fatal("failed to start")
	}
	var oauth2Gateway authorizing.OAuth2Gateway
	if googleCreds != nil {
		oauth2Gateway = authorizing.NewGoogleOAuth2Gateway(googleCreds)
	} else {
		var email string
		email, err = lookupEnvString("STOCK_ADMIN_EMAIL")
		if err != nil {
			logger.WithError(err).Fatal("failed to start")
		}
		oauth2Gateway = authorizing.NewStubOAuth2Gateway(email)
	}

	// Create gateway without stocktaking service - it will be created later
	stockGateway := &stockGateway{}

	redisAddr := getEnvString("STOCK_REDIS_HOST", "localhost")
	authorizingRepository, err := redis.NewAuthRepository(redisAddr)
	if err != nil {
		logger.WithError(err).Fatal("failed to connect redis")
	}
	authorizingService := authorizing.NewLoggingMiddleware(authorizing.NewService(oauth2Gateway, stockGateway, authorizingRepository), logger)
	authorizingHandler := authorizing.MakeHTTPHandler(authorizingService, authorizing.NewLoggingEncoder(authorizing.EncodeError, logger))

	db, err := postgres.NewClient(getDSN())
	if err != nil {
		logger.WithError(err).Fatal("failed database setup")
	}
	defer db.Close()
	stockRepository := postgres.NewStockRepository(db)
	stocktakingService := stocktaking.NewService(stockRepository)
	stocktakingGRPCServer := stocktaking.NewGRPCServer(stocktakingService)
	stocktakingGRPCServer = stocktaking.NewLoggingMiddleware(stocktakingGRPCServer, logger)

	// Connect back stocktaking Service with authorizing Service
	stockGateway.service = stocktakingService

	urlBuilder, err := newURLBuilder()
	if err != nil {
		logger.WithError(err).Fatal("failed to start")
	}
	labelingService := labeling.NewLoggingMiddleware(labeling.NewService(stocktakingService, urlBuilder), logger)
	pageGenerator, err := labeling.NewPageGenerator()
	if err != nil {
		logger.WithError(err).Fatal("failed to start")
	}
	labelingHandler := labeling.MakeHTTPHandler(labelingService, pageGenerator, labeling.NewLoggingEncoder(labeling.EncodeError, logger))

	serverHub := server.NewHub()

	// Serve grpc
	baseServer := grpc.NewServer()
	stocktakingapi.RegisterBackendServer(baseServer, stocktakingGRPCServer)
	serverHub.Serve(func() error {
		grpcListener, grpcErr := net.Listen("tcp", ServiceGRPCPort)
		if err != nil {
			return errors.Wrapf(grpcErr, "failed to listen port %s", ServiceGRPCPort)
		}
		grpcErr = baseServer.Serve(grpcListener)
		return errors.Wrap(grpcErr, "failed to serve GRPC")
	}, func() error {
		baseServer.GracefulStop()
		return nil
	})

	// Serve http endpoints and grpc-gateway proxy
	ctx := context.Background()
	ctx, cancel := context.WithCancel(ctx)
	var httpServer *http.Server
	serverHub.Serve(func() error {
		grpcGatewayMux := runtime.NewServeMux()
		opts := []grpc.DialOption{grpc.WithInsecure()}
		err = stocktakingapi.RegisterBackendHandlerFromEndpoint(ctx, grpcGatewayMux, ServiceGRPCPort, opts)
		if err != nil {
			return err
		}

		router := mux.NewRouter()
		router.PathPrefix("/stocktaking/").Handler(http.StripPrefix("/stocktaking", grpcGatewayMux))
		router.PathPrefix("/labeling/").Handler(labelingHandler)
		router.PathPrefix("/authorizing/").Handler(authorizingHandler)

		httpServer = &http.Server{
			Handler: router,
			Addr:    ServiceRESTPort,
			// Good practice: enforce timeouts for servers you create!
			WriteTimeout: 15 * time.Second,
			ReadTimeout:  15 * time.Second,
		}
		return httpServer.ListenAndServe()
	}, func() error {
		cancel()
		return httpServer.Shutdown(context.Background())
	})

	// Wait until stopped
	err = serverHub.Wait()
	if err != nil {
		logger.WithError(err).Fatal("failed to serve")
	}
}

type stockGateway struct {
	service stocktaking.Service
}

func (g *stockGateway) FindOwnerByEmail(email string) (*stock.Owner, error) {
	return g.service.FindOwnerByEmail(email)
}

func getGoogleCredentials() (*authorizing.GoogleCredentials, error) {
	siteDomain, err := lookupEnvString("STOCK_DOMAIN")
	if err != nil {
		return nil, err
	}
	clientID := getEnvString("STOCK_GOOGLE_CLIENT_ID", "")
	clientSecret := getEnvString("STOCK_GOOGLE_CLIENT_SECRET", "")
	if clientID == "" || clientSecret == "" {
		// No google app credentials - it's OK for local development
		return nil, nil
	}
	return &authorizing.GoogleCredentials{
		ClientID:     clientID,
		ClientSecret: clientSecret,
		RedirectURI:  fmt.Sprintf("%s/authorizing/token", siteDomain),
	}, nil
}

func newURLBuilder() (labeling.URLBuilder, error) {
	siteDomain, err := lookupEnvString("STOCK_DOMAIN")
	if err != nil {
		return nil, err
	}
	return labeling.NewURLBuilder(siteDomain), nil
}

func getDSN() postgres.DSN {
	host, ok := os.LookupEnv("STOCK_DB_HOST")
	if !ok {
		host = "localhost"
	}
	port := 5432
	if portStr, ok := os.LookupEnv("STOCK_DB_PORT"); ok {
		portNo, err := strconv.Atoi(portStr)
		if err == nil {
			port = portNo
		}
	}

	user := os.Getenv("STOCK_DB_USERNAME")
	password := os.Getenv("STOCK_DB_PASSWORD")
	database := os.Getenv("STOCK_DB_NAME")
	return postgres.DSN{
		Host:     host,
		Port:     uint64(port),
		User:     user,
		Password: password,
		Database: database,
	}
}

func getEnvString(name, fallback string) string {
	value, ok := os.LookupEnv(name)
	if !ok || value == "" {
		return fallback
	}
	return value
}

func lookupEnvString(name string) (string, error) {
	value, ok := os.LookupEnv(name)
	if !ok || value == "" {
		return "", errors.Errorf("environment variable %s not set", name)
	}
	return value, nil
}
