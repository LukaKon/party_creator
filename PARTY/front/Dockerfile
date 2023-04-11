FROM node:18-alpine3.17

# ENV PATH="./node_modules/.bin:$PATH"

LABEL maintainer="PartyTeam"
LABEL description="PartyWizard Frontend"

WORKDIR /app

COPY package.json  .
COPY package-lock.json .

RUN apk add --no-cache --virtual .gyp \
    python3 \
    make \
    g++ \
    && npm install \
    && apk del .gyp

COPY . .

RUN npm run build

RUN adduser \
  --disabled-password \
  # --no-create-home \
  react-user

RUN chown -R react-user:react-user /app

USER react-user