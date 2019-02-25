package main

//go:generate protoc -I ../stocktakingapi --go_out=plugins=grpc:stocktakingapi ../stocktakingapi/api.proto

func main() {
}
