package main

//go:generate protoc -I ../../../stocktakingapi --go_out=plugins=grpc:../../stocktakingapi ../../../stocktakingapi/api.proto

import (
	"net"
	"os"

	log "github.com/sirupsen/logrus"
	"google.golang.org/grpc"

	stocktakinggrpc "stocktakingbackend/grpc"
	"stocktakingbackend/postgres"
	"stocktakingbackend/stock"
	"stocktakingbackend/stocktakingapi"
)

// ServedPort - port for GRPC API
const ServedPort = "8081"

type richJSONFormatter struct {
	jsonFormatter log.JSONFormatter
}

func main() {
	logger := &log.Logger{
		Out: os.Stderr,
		Formatter: &log.JSONFormatter{
			DataKey: "context",
		},
		Level: log.InfoLevel,
	}

	db, err := postgres.NewClient(postgres.DSN{
		Host:     "stock-db",
		User:     "stock",
		Password: "1234",
		Database: "stock",
	})
	if err != nil {
		logger.WithError(err).Fatal("failed to connect database")
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
