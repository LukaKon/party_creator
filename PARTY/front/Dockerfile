FROM node:18-alpine3.17

# ENV PATH="./node_modules/.bin:$PATH"

LABEL maintainer="PartyTeam"
LABEL description="PartyWizard Frontend"

WORKDIR /app

# USER react

# RUN chown -R node:node /app
# COPY --chown=react:react package.json .
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

RUN npm run build
RUN adduser \
    --disabled-password \
    # --no-create-home \
    react-user

USER react-user