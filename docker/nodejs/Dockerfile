FROM node:16.16.0

WORKDIR /client
COPY ./client /client
RUN npm install
RUN npm run build

WORKDIR /server
COPY ./server /server
RUN npm install
RUN npm run build

CMD npm run start:prod