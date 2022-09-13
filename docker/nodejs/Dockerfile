FROM node:16.16.0

WORKDIR /client
COPY ./client/package.json /client/package.json
RUN npm install

WORKDIR /server
COPY ./server/package.json /server/package.json
RUN npm install

WORKDIR /client
COPY ./client /client
RUN npm run build

WORKDIR /server
COPY ./server /server
RUN npm run build

CMD npm run start:prod