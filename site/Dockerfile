FROM node:16.1.0

RUN mkdir -p /var/www/app/siteTX
WORKDIR /var/www/app/siteTX

COPY ./ ./

RUN npm install

EXPOSE 3000

CMD npm run start