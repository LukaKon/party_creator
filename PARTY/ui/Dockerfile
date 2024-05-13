FROM node:20-alpine3.19

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
		&& npm install -g vite@latest \
    && apk del .gyp

RUN npm install

COPY . .

RUN adduser \
  --disabled-password \
  react-user

RUN chown -R react-user:react-user /app

USER react-user
