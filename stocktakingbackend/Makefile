
.PHONY: all
all: build

.PHONY: vendor
vendor:
	go mod tidy
	go mod vendor

.PHONY: build
build: vendor
	go generate cmd/stocktakingbackend/main.go
	go build -mod vendor -o build/stocktakingbackend cmd/stocktakingbackend/main.go
	go build -mod vendor -o build/stocktakingtests cmd/stocktakingtests/main.go

.PHONY: test
test:
	go test ./...
	go vet ./...
