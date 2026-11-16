FROM node:22-alpine3.20

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 5173