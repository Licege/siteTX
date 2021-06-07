FROM node:15.12

RUN mkdir -p /app
WORKDIR /app

COPY package.json package.json
RUN npm install --force
RUN npm rebuild node-sass

EXPOSE 3001