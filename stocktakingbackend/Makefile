
.PHONY: all
all: build

.PHONY: build
build:
	go mod tidy
	go mod vendor
	go generate
	go build -mod vendor

.PHONY: test
test:
	go test ./...
	go vet ./...
