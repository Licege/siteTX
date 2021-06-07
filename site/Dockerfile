FROM node:15.12

RUN mkdir -p /app
WORKDIR /app

COPY package.json package.json

# Need for fix node-sass bugs
RUN npm install npm@6.14.11 -g
RUN npm install
#RUN npm rebuild node-sass

EXPOSE 3000