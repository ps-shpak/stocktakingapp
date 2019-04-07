FROM node:11-stretch as builder

# Enable gnupg and https support for apt
RUN apt-get -qq update && apt-get install -y --no-install-recommends gnupg apt-transport-https ca-certificates

# install protoc (protobuf compiler) and grpc-web plugin
RUN apt-get install -y --no-install-recommends unzip && \
    curl --silent --location https://github.com/protocolbuffers/protobuf/releases/download/v3.6.1/protoc-3.6.1-linux-x86_64.zip --output protoc.zip && \
    unzip protoc.zip -d protoc && \
    mv protoc/bin/protoc /usr/bin/ && \
    rm -rf protoc protoc.zip && \
    curl --silent --location https://github.com/grpc/grpc-web/releases/download/1.0.4/protoc-gen-grpc-web-1.0.4-linux-x86_64 --output /usr/local/bin/protoc-gen-grpc-web && \
    chmod +x /usr/local/bin/protoc-gen-grpc-web

# Install yarn
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | gpg --dearmor > /etc/apt/trusted.gpg.d/yarn.gpg && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get -qq update && apt-get install -y --no-install-recommends yarn

# Install build environment
RUN npm install -g typescript
RUN npm install -g ts-node
RUN npm install -g node-gyp
RUN npm install -g node-pre-gyp@0.12.0 --unsafe-perm
RUN yarn global add grpc-tools@1.7.2

# Set working directory
WORKDIR /stocktakingweb

# Install dependencies first
COPY "stocktakingweb/package.json" "stocktakingweb/package-lock.json" /stocktakingweb/
RUN npm install

# Copy project and build
COPY stocktakingweb/ /stocktakingweb/
RUN npm run build

# Build runtime container
FROM nginx:1.15
COPY stocktakingweb/nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder --chown=www-data:www-data /stocktakingweb/build /stocktakingweb
