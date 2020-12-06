
#FROM node:11
FROM node:12.13.1-alpine

ENV NODE_ENV=development
RUN apk --no-cache add --virtual builds-deps build-base python
RUN set -xe \
    && apk add --no-cache --purge -uU \
        curl icu-libs unzip zlib-dev musl \
        mesa-gl mesa-dri-swrast \
        libreoffice libreoffice-base libreoffice-lang-uk \
        ttf-freefont ttf-opensans ttf-ubuntu-font-family ttf-inconsolata \
    ttf-liberation ttf-dejavu \
        libstdc++ dbus-x11 \
    && echo "http://dl-cdn.alpinelinux.org/alpine/edge/main" >> /etc/apk/repositories \
    && echo "http://dl-cdn.alpinelinux.org/alpine/edge/community" >> /etc/apk/repositories \
    && echo "http://dl-cdn.alpinelinux.org/alpine/edge/testing" >> /etc/apk/repositories \
    && apk add --no-cache -U \
    ttf-font-awesome ttf-mononoki ttf-hack \
    && rm -rf /var/cache/apk/* /tmp/*
RUN npm config set python /usr/bin/python

RUN yarn global add typescript

WORKDIR /root/app

COPY package.json .
COPY yarn.lock .

RUN yarn
RUN yarn global add pm2 

COPY  . .

RUN yarn build
RUN yarn seed ; exit 0

ENV PM2_PUBLIC_KEY mrmu58cex4p9mzo
ENV PM2_SECRET_KEY 6i58ob4g7lkq9vi

# CMD yarn start:prod
CMD [ "pm2-runtime", "dist/main.js" ]
