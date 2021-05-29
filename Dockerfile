FROM node:16.1.0

WORKDIR /var/www/app/siteTX

COPY ./ ./

RUN npm install

EXPOSE 3000

CMD npm run start