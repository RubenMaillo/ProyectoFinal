FROM node:10
WORKDIR /app
#COPY package.json package.json
RUN npm install --save
#COPY . .
EXPOSE 3000
CMD npm run dev
