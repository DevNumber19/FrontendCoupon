FROM node:14-stretch-slim
MAINTAINER Titiwut M. <titiwut@feyverly.com>
SHELL ["/bin/bash", "-c"]
ARG BUILD_ENV=dev

EXPOSE 80
WORKDIR /app

ENV HOST=0.0.0.0 \
    PORT=80

COPY package.json /app
RUN npm install

COPY . /app
COPY .ci/setting/$BUILD_ENV /app/.env
RUN npm run build:$BUILD_ENV

HEALTHCHECK --interval=5s --timeout=5s CMD curl -sf http://localhost:3000/ || exit 1
CMD ["npm", "run", "start"]
