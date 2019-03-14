package main

//go:generate protoc -I ../stocktakingapi --go_out=plugins=grpc:stocktakingapi ../stocktakingapi/api.proto

import (
	"net"
	"os"

	log "github.com/sirupsen/logrus"
	"google.golang.org/grpc"

	stocktakinggrpc "stocktakingbackend/grpc"
	"stocktakingbackend/stock"
	"stocktakingbackend/stocktakingapi"
)

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

	service := stock.NewService(nil)
	grpcServer := stocktakinggrpc.NewGRPCServer(service)
	grpcServer = stocktakinggrpc.NewLoggingMiddleware(grpcServer, logger)

	grpcPort := "8080"
	grpcListener, err := net.Listen("tcp", ":"+grpcPort)
	if err != nil {
		logger.WithError(err).Fatal("failed to listen socket")
	}
	logger.Info("listening GRPC requests on port " + grpcPort)
	baseServer := grpc.NewServer()
	stocktakingapi.RegisterBackendServer(baseServer, grpcServer)

	err = baseServer.Serve(grpcListener)
	if err != nil {
		logger.WithError(err).Fatal("failed to serve")
	}
}
