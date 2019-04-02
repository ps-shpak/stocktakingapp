FROM node:11-stretch

# install protoc (protobuf compiler)
RUN apt-get -qq update && \
    apt-get install -y --no-install-recommends unzip && \
    curl --silent --location https://github.com/protocolbuffers/protobuf/releases/download/v3.6.1/protoc-3.6.1-linux-x86_64.zip --output protoc.zip && \
    unzip protoc.zip -d protoc && \
    mv protoc/bin/protoc /usr/bin/ && \
    rm -rf protoc protoc.zip

# Install build environment
RUN npm install -g typescript && \
    npm install -g node-gyp && \
    npm install -g node-pre-gyp --unsafe-perm && \
    npm install -g grpc-tools && \
    npm install -g ts-node

COPY "shpak-frontend" /app

# TODO: copy and build project
