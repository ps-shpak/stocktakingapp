
.PHONY: all
all: build test lint

.PHONY: vendor
vendor:
	go mod tidy
	go mod vendor

.PHONY: build
build: vendor
	$(shell go env GOPATH)/bin/go-bindata -pkg data -o postgres/data/migrations.go -prefix "postgres/migrations" postgres/migrations
	go generate cmd/stocktakingbackend/main.go
	go build -mod vendor -o build/stocktakingbackend cmd/stocktakingbackend/*.go

.PHONY: test
test:
	go test ./...
	go vet ./...

.PHONY: lint
lint:
	$(shell go env GOPATH)/bin/golangci-lint run
