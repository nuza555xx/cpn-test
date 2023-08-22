FROM node:18-alpine

WORKDIR /app

COPY . .

COPY package*.json ./

ENV PORT=80

EXPOSE ${PORT}

RUN npm install --production

CMD ["npm", "start"]
