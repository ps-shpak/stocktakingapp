package main

//go:generate protoc -I ../../../stocktakingapi --go_out=plugins=grpc:../../stocktakingapi ../../../stocktakingapi/api.proto

import (
	"net"
	"os"
	"strconv"

	log "github.com/sirupsen/logrus"
	"google.golang.org/grpc"

	stocktakinggrpc "stocktakingbackend/grpc"
	"stocktakingbackend/postgres"
	"stocktakingbackend/stock"
	"stocktakingbackend/stocktakingapi"
)

// ServedPort - port for GRPC API
const ServedPort = "8081"

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

	grpcListener, err := net.Listen("tcp", ":"+ServedPort)
	if err != nil {
		logger.WithError(err).Fatal("failed to listen socket")
	}
	logger.Info("listening GRPC requests on port " + ServedPort)
	baseServer := grpc.NewServer()
	stocktakingapi.RegisterBackendServer(baseServer, grpcServer)

	err = baseServer.Serve(grpcListener)
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
