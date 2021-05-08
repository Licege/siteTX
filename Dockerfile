FROM node:16-alpine3.11

RUN apk add git \
    && git clone https://github.com/Licege/siteTX.git \
    && cd siteTX

WORKDIR /var/www/app

EXPOSE 3000

CMD env ${cat env} npm run start