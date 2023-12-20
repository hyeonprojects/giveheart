FROM node:21-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN npx prisma generate

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 80

CMD ["yarn", "start"]
