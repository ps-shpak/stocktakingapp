FROM golang:1.11-stretch AS builder

# Prepare builder container
RUN apt-get -qq update && \
    apt-get install -y --no-install-recommends unzip && \
    curl --silent --location https://github.com/protocolbuffers/protobuf/releases/download/v3.6.1/protoc-3.6.1-linux-x86_64.zip --output protoc.zip && \
    unzip protoc.zip -d protoc && \
    mv protoc/bin/protoc /usr/bin/ && \
    rm -rf protoc protoc.zip && \
    export GIT_TAG="v1.2.0" && \
    go get -d -u github.com/golang/protobuf/protoc-gen-go && \
    git -C "$(go env GOPATH)"/src/github.com/golang/protobuf checkout $GIT_TAG && \
    go install github.com/golang/protobuf/protoc-gen-go

ADD stocktakingapi /usr/src/github.com/ps-shpak/stocktakingapp/stocktakingapi
ADD stocktakingbackend /usr/src/github.com/ps-shpak/stocktakingapp/stocktakingbackend
WORKDIR /usr/src/github.com/ps-shpak/stocktakingapp/stocktakingbackend

RUN make install
RUN make

FROM debian:stretch

COPY --from=builder /usr/src/github.com/ps-shpak/stocktakingapp/stocktakingbackend/stocktakingbackend /usr/bin/stocktakingbackend

CMD [ "/usr/bin/stocktakingbackend" ]
