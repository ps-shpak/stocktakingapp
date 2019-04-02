FROM node:11-stretch

# install protoc (protobuf compiler) and grpc-web plugin
RUN apt-get -qq update && \
    apt-get install -y --no-install-recommends unzip && \
    curl --silent --location https://github.com/protocolbuffers/protobuf/releases/download/v3.6.1/protoc-3.6.1-linux-x86_64.zip --output protoc.zip && \
    unzip protoc.zip -d protoc && \
    mv protoc/bin/protoc /usr/bin/ && \
    rm -rf protoc protoc.zip && \
    curl --silent --location https://github.com/grpc/grpc-web/releases/download/1.0.4/protoc-gen-grpc-web-1.0.4-linux-x86_64 --output /usr/local/bin/protoc-gen-grpc-web && \
    chmod +x /usr/local/bin/protoc-gen-grpc-web

# Install build environment
RUN npm install -g typescript && \
    npm install -g node-gyp && \
    npm install -g node-pre-gyp --unsafe-perm && \
    npm install -g grpc-tools && \
    npm install -g ts-node

COPY "shpak-frontend" /app/frontend

WORKDIR /app/frontend
RUN npm install

# TODO: copy and build project
