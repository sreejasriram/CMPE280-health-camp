FROM node:10.15.1
RUN mkdir -p /usr/src/health-camp-frontend
WORKDIR /usr/src/health-camp-frontend
COPY . .
RUN npm install
EXPOSE 8000
CMD [ "node", "index" ]