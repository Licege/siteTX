FROM node:16.1.0

RUN mkdir -p /var/www/app/serverNodeTX
WORKDIR /var/www/app/serverNodeTX

COPY package*.json ./
COPY .env ./

RUN npm install

COPY . .

RUN git clone https://github.com/vishnubob/wait-for-it.git