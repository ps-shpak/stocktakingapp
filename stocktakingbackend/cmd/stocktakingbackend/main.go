package main

//go:generate protoc -I ../../../stocktakingapi --go_out=plugins=grpc:../../stocktakingapi ../../../stocktakingapi/api.proto

import (
	"context"
	"net"
	"net/http"
	"os"
	"strconv"

	"github.com/improbable-eng/grpc-web/go/grpcweb"
	"github.com/pkg/errors"
	log "github.com/sirupsen/logrus"
	"google.golang.org/grpc"

	stocktakinggrpc "stocktakingbackend/grpc"
	"stocktakingbackend/postgres"
	"stocktakingbackend/server"
	"stocktakingbackend/stock"
	"stocktakingbackend/stocktakingapi"
)

// ServiceGRPCPort - port for GRPC API
const ServiceGRPCPort = "8081"

// ServiceGRPCWebPort - port for GRPC-Web API
const ServiceGRPCWebPort = "8082"

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

	repository := postgres.NewStockRepository(db)
	service := stock.NewService(repository)
	grpcServer := stocktakinggrpc.NewGRPCServer(service)
	grpcServer = stocktakinggrpc.NewLoggingMiddleware(grpcServer, logger)

	baseServer := grpc.NewServer()
	stocktakingapi.RegisterBackendServer(baseServer, grpcServer)

	serverHub := server.NewHub()

	// Serve grpc
	serverHub.Serve(func() error {
		grpcListener, grpcErr := net.Listen("tcp", ":"+ServiceGRPCPort)
		if err != nil {
			return errors.Wrapf(grpcErr, "failed to listen port %s", ServiceGRPCPort)
		}
		grpcErr = baseServer.Serve(grpcListener)
		return errors.Wrap(grpcErr, "failed to serve GRPC")
	}, func() error {
		baseServer.GracefulStop()
		return nil
	})

	// Serve grpc-web
	grpcwebServer := grpcweb.WrapServer(baseServer)
	httpServer := &http.Server{
		Addr: ":" + ServiceGRPCWebPort,
	}
	serverHub.Serve(func() error {
		httpServer.Handler = http.HandlerFunc(func(resp http.ResponseWriter, req *http.Request) {
			if grpcwebServer.IsGrpcWebRequest(req) {
				grpcwebServer.ServeHTTP(resp, req)
			}
			// Fall back to other servers.
			http.DefaultServeMux.ServeHTTP(resp, req)
		})
		return httpServer.ListenAndServe()
	}, func() error {
		return httpServer.Shutdown(context.Background())
	})

	// Wait until stopped
	err = serverHub.Wait()
	if err != nil {
		logger.WithError(err).Fatal("failed to serve")
	}
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
