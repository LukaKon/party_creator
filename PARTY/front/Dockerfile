FROM node:18-alpine3.17

WORKDIR /app

ENV PATH="./node_modules/.bin:$PATH"

LABEL maintainer="PartyTeam"
LABEL description="PartyWizard Frontend"

COPY package.json .

# RUN npm install
RUN apk add --no-cache --virtual .gyp \
    python3 \
    make \
    g++ \
    && npm install \
    && apk del .gyp

# RUN adduser --disabled-password --no-create-home react-user

COPY . .

# USER react-user

RUN npm run build
