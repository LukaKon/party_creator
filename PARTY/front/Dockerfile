FROM node:18.12-alpine3.17

# Create app directory
WORKDIR /app

COPY package.json ./

RUN apk add --no-cache --virtual .gyp \
    python3 \
    make \
    g++ \
    && npm install \
    && apk del .gyp

# Copy application
COPY . .
