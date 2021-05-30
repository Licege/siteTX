FROM node:16.1.0

RUN mkdir -p /var/www/app/serverNodeTX
WORKDIR /var/www/app/serverNodeTX

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 9092

CMD npm run start