FROM node:16 as builder
WORKDIR /builder
COPY package.json yarn.lock ./
RUN yarn
COPY . .
RUN yarn build

FROM caddy:2-alpine
LABEL maintainer="BachNX <bach.ngo@tiki.vn>"
COPY ./resources/Caddyfile /etc/caddy/Caddyfile
COPY --from=builder /builder/build /app/html
EXPOSE 80
