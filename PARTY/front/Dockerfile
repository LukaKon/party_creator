# stage 1 - build react app
FROM node:18-alpine3.15 as builder

WORKDIR /app

ENV PATH="./node_modules/.bin:$PATH"

LABEL maintainer="PartyTeam"
LABEL description="PartyWizard Frontend"

COPY package.json .

RUN npm install

COPY . .

RUN npm run build
# RUN npm run build && \
# adduser \
# --disabled-password \
# --no-create-home \
# react-user

# USER react-user

# stage 2 - copy react build app to nginx
# FROM nginx:alpine

# WORKDIR /usr/share/nginx/html

# # remove default nginx static assets
# RUN rm -rf ./*

# # COPY ./nginx.conf /etc/nginx/conf.d/default.conf:ro
# # # COPY ./../../nginx/gzip.conf /etc/nginx/conf.d/gzip.conf:ro

# # RUN rm -rf /usr/share/nginx/html/*

# COPY --from=builder /app/dist .
# #/usr/share/nginx/html
# ENTRYPOINT [ "nginx", "-g", "daemon off;" ]

# EXPOSE 3000 80