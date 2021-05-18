FROM node:16.1.0

WORKDIR /var/www/app/siteTX

COPY package*.json ./
COPY ./ ./

RUN npm install
RUN npm rebuild node-sass

#COPY ./dist ./dist

#RUN apk add git \
#    && git clone https://github.com/Licege/siteTX.git \
#    && cd siteTX

EXPOSE 3000

CMD npm run start