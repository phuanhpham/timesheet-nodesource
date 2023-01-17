FROM node:16-alpine as builder

WORKDIR /app

COPY package*.json ./

RUN npm install -g sequelize-cli

RUN npm install

COPY . .

FROM builder as dev

CMD []

