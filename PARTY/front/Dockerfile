FROM node:18-alpine3.16

WORKDIR /app

ENV PATH="./node_modules/.bin:$PATH"

LABEL maintainer="PartyTeam"
LABEL description="PartyWizard Frontend"

COPY package.json .

RUN npm install

# RUN adduser --disabled-password --no-create-home react-user

COPY . .

RUN npm run build

# USER react-user
