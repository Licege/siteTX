FROM node:15.12

RUN mkdir -p /var/www/app/adminPanelTX
WORKDIR /var/www/app/adminPanelTX

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD env $(cat .env) npm run start