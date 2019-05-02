package main

import (
	"context"
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

	"stocktakingbackend/labeling"
	"stocktakingbackend/postgres"
	"stocktakingbackend/server"
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

	db, err := postgres.NewClient(getDSN())
	if err != nil {
		logger.WithError(err).Fatal("failed database setup")
	}
	defer db.Close()

	urlBuilder, err := newURLBuilder()
	if err != nil {
		logger.WithError(err).Fatal("failed to start")
	}

	stockRepository := postgres.NewStockRepository(db)
	stocktakingService := stocktaking.NewService(stockRepository)
	stocktakingGRPCServer := stocktaking.NewGRPCServer(stocktakingService)
	stocktakingGRPCServer = stocktaking.NewLoggingMiddleware(stocktakingGRPCServer, logger)

	labelingService := labeling.NewService(stocktakingService, urlBuilder)
	pageGenerator, err := labeling.NewPageGenerator()
	if err != nil {
		logger.WithError(err).Fatal("failed to start")
	}
	encodeError := labeling.NewLoggingEncoder(labeling.EncodeError, logger)
	labelingHandler := labeling.MakeHTTPHandler(labelingService, pageGenerator, encodeError)

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

func newURLBuilder() (labeling.URLBuilder, error) {
	siteDomain, ok := os.LookupEnv("STOCK_DOMAIN")
	if !ok || siteDomain == "" {
		return nil, errors.New("environment variable STOCK_DOMAIN not set")
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
