FROM node:16

WORKDIR /var/www/app/siteTX

COPY package*.json ./

RUN npm install
RUN npm build

COPY . .

#COPY ./dist ./dist

#RUN apk add git \
#    && git clone https://github.com/Licege/siteTX.git \
#    && cd siteTX

EXPOSE 3000

CMD npm run start