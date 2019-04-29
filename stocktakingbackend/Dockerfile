FROM golang:1.12-stretch AS builder

# install protoc (protobuf compiler) and standard *.proto files
RUN apt-get -qq update && \
    apt-get install -y --no-install-recommends unzip && \
    curl --silent --location https://github.com/protocolbuffers/protobuf/releases/download/v3.6.1/protoc-3.6.1-linux-x86_64.zip --output protoc.zip && \
    unzip protoc.zip -d protoc && \
    mv protoc/bin/protoc /usr/bin/ && \
    mv protoc/include/google /usr/include/ && \
    rm -rf protoc protoc.zip

# install grpc-gateway
RUN go get -u github.com/grpc-ecosystem/grpc-gateway/protoc-gen-grpc-gateway && \
    go get -u github.com/grpc-ecosystem/grpc-gateway/protoc-gen-swagger

# install protoc-gen-go v1.2.0
RUN go get -d -u github.com/golang/protobuf/protoc-gen-go && \
    git -C "$(go env GOPATH)/src/github.com/golang/protobuf" checkout v1.2.0 && \
    go install github.com/golang/protobuf/protoc-gen-go && \
    rm -rf "$(go env GOPATH)/src/github.com/golang/protobuf"

# install golangci-lint
RUN go get -u github.com/golangci/golangci-lint/cmd/golangci-lint

# install go-bindata
RUN go get -u github.com/go-bindata/go-bindata/...

# set working directory
WORKDIR /usr/src/github.com/ps-shpak/stocktakingapp/stocktakingbackend

# install dependencies first
COPY "stocktakingbackend/Makefile" "stocktakingbackend/go.mod" "stocktakingbackend/go.sum" /usr/src/github.com/ps-shpak/stocktakingapp/stocktakingbackend/
RUN make vendor

# copy source code and build
ADD stocktakingapi /usr/src/github.com/ps-shpak/stocktakingapp/stocktakingapi
ADD stocktakingbackend /usr/src/github.com/ps-shpak/stocktakingapp/stocktakingbackend
RUN make

FROM debian:stretch

COPY --from=builder /usr/src/github.com/ps-shpak/stocktakingapp/stocktakingbackend/build/stocktakingbackend /usr/bin/stocktakingbackend

CMD [ "/usr/bin/stocktakingbackend" ]
