FROM node:carbon

WORKDIR /usr/src/app

COPY release/package*.json ./
RUN npm install

COPY release .

EXPOSE 8080

CMD [ "npm", "start" ]
