FROM node:10.15.1
RUN mkdir -p /usr/src/healthcamp
WORKDIR /usr/src/healthcamp
COPY . .
RUN npm install
EXPOSE 8080
CMD [ "node", "index" ]