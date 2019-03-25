FROM node:10
WORKDIR /app
COPY package.json /app/
RUN npm install -g nodemon
RUN npm install
EXPOSE 3000
CMD npm run dev
