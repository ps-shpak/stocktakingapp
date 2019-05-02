# define $GOPATH and ensure that golang's bin dir is in $PATH
GOPATH=$(shell go env GOPATH)
export PATH := $(GOPATH)/bin:$(PATH)

API_PROTO_DIR=../stocktakingapi

.PHONY: all
all: build test lint

.PHONY: vendor
vendor:
	go mod tidy
	go mod vendor

generate:
	$(GOPATH)/bin/go-bindata -pkg data -o postgres/data/migrations.go -prefix "postgres/migrations" postgres/migrations
	$(GOPATH)/bin/go-bindata -pkg data -o labeling/data/templates.go -prefix "labeling/templates" labeling/templates
	protoc \
		-I/usr/include \
		-I$(GOPATH)/src \
		-I$(GOPATH)/src/github.com/grpc-ecosystem/grpc-gateway/third_party/googleapis \
		-I $(API_PROTO_DIR) \
		--go_out=plugins=grpc:stocktakingapi \
		--grpc-gateway_out=logtostderr=true:stocktakingapi \
		$(API_PROTO_DIR)/api.proto

.PHONY: build
build: vendor generate
	go build -mod vendor -o build/stocktakingbackend cmd/stocktakingbackend/*.go

.PHONY: test
test:
	go test ./...
	go vet ./...

.PHONY: lint
lint:
	$(GOPATH)/bin/golangci-lint run
