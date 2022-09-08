FROM node:14-alpine as base
WORKDIR /app
COPY package.json . 
RUN npm install
COPY . .


CMD npm run start:dev