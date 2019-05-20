FROM node:11-stretch as builder

# Enable gnupg and https support for apt
RUN apt-get -qq update && apt-get install -y --no-install-recommends gnupg apt-transport-https ca-certificates

# Install build environment
RUN npm install -g typescript
RUN npm install -g ts-node
RUN npm install -g node-gyp
RUN npm install -g node-pre-gyp@0.12.0 --unsafe-perm
RUN yarn global add grpc-tools@1.7.2

# Install mocha
RUN npm install -g mocha

# Set working directory
WORKDIR /stocktakingapitests

# Install dependencies first
COPY "package.json" "package-lock.json" /stocktakingapitests/
RUN npm install

# Copy tests
COPY api /stocktakingapitests/api
COPY test /stocktakingapitests/test
COPY tsconfig.json /stocktakingapitests/

# Set run command
CMD mocha --require ts-node/register test/test_backend.ts
