FROM node:10
WORKDIR /app
<<<<<<< HEAD
COPY package.json /app/
RUN npm install -g nodemon
RUN npm install
=======
#COPY package.json package.json
RUN npm install --save
#COPY . .
>>>>>>> 731047364ac3c5a1eab668a2983ddd2e0cc33442
EXPOSE 3000
CMD npm run dev
