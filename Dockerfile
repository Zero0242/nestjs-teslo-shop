FROM node:19.2-alpine3.16 as dependencies
WORKDIR /app
COPY package.json .
RUN yarn install --frozen-lockfile

FROM node:19.2-alpine3.16 as builder
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
# RUN yarn test
RUN yarn build

FROM node:19.2-alpine3.16 as prod-dependencies
WORKDIR /app
COPY package.json .
RUN yarn install --prod --frozen-lockfile

FROM node:19.2-alpine3.16 as apprunner
WORKDIR /app
COPY --from=prod-dependencies /app/node_modules ./node_modules
COPY --from=builder /app/dist   ./dist
ENV APP_VERSION=${APP_VERSION}
EXPOSE 3000
CMD [ "node",'dist/main.js' ]
