ARG NODE_VERSION=current-alpine
FROM node:${NODE_VERSION}
RUN echo "**** install Python ****" && \
    apk add --no-cache python3 && \
    if [ ! -e /usr/bin/python ]; then ln -sf python3 /usr/bin/python ; fi && \
    \
    echo "**** install pip ****" && \
    python3 -m ensurepip && \
    rm -r /usr/lib/python*/ensurepip && \
    pip3 install --no-cache --upgrade pip setuptools wheel && \
    if [ ! -e /usr/bin/pip ]; then ln -s pip3 /usr/bin/pip ; fi

RUN apk --no-cache add cmake clang clang-dev make gcc g++ libc-dev linux-headers

RUN yarn global add node-gyp

WORKDIR /usr/src/app
ARG APP_VERSION=dev
ARG APP_COMMITID=HEAD

COPY ./package.json /usr/src/app
COPY ./yarn.lock /usr/src/app
RUN yarn
COPY . .
RUN yarn build

CMD [ "node", "dist/main.js" ]
