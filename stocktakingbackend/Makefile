
.PHONY: all
all: build

.PHONY: install
install:
	go mod tidy
	go mod vendor

.PHONY: build
build: install
	go generate
	go build -mod vendor

.PHONY: test
test:
	go test ./...
	go vet ./...
