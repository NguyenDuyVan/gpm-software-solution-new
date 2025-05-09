# Sử dụng Node.js
FROM node:22

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

EXPOSE 4001

CMD ["yarn", "dev"]
