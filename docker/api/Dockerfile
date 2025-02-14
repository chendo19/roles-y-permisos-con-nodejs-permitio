FROM node:22-bookworm-slim

WORKDIR /app

COPY package*.json ./

COPY .env .env

RUN npm install

COPY . .

EXPOSE 5050

CMD ["npm", "run", "dev"]