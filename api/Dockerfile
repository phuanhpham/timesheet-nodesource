FROM node:16-alpine AS builder

WORKDIR /app

COPY . .

RUN npm install

FROM builder AS dev

RUN npm install -g sequelize-cli

CMD []
