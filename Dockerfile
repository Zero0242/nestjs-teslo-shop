FROM node:23-alpine as dependencies
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn install

FROM node:23-alpine as builder
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
# RUN yarn test
RUN yarn build

FROM node:23-alpine as prod-dependencies
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn install --prod

FROM node:23-alpine as apprunner
EXPOSE 3000
ENV APP_VERSION=${APP_VERSION}
WORKDIR /app
COPY --from=prod-dependencies /app/node_modules ./node_modules
COPY --from=builder /app/dist   ./dist
COPY public/ ./public
COPY static/ ./static
CMD [ "node","dist/main.js" ]
