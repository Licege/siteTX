FROM node:16.20.2

RUN mkdir -p /var/www/app/serverNodeTX
WORKDIR /var/www/app/serverNodeTX

COPY package*.json ./
RUN npm install
COPY . .

RUN git clone https://github.com/vishnubob/wait-for-it.git