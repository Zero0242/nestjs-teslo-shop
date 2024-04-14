FROM node:19.2-alpine3.16 as dependencies
WORKDIR /app
COPY package.json .
RUN npm install

FROM node:19.2-alpine3.16 as builder
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
# RUN yarn test
RUN yarn build

FROM node:19.2-alpine3.16 as prod-dependencies
WORKDIR /app
COPY package.json .
RUN npm install --prod

FROM node:19.2-alpine3.16 as apprunner
EXPOSE 3000
ENV APP_VERSION=${APP_VERSION}
WORKDIR /app
COPY --from=prod-dependencies /app/node_modules ./node_modules
COPY --from=builder /app/dist   ./dist
COPY public/ ./public
COPY static/ ./static
CMD [ "node","dist/main.js" ]
