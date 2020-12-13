FROM node:14.15.1-alpine3.12
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile
COPY . ./
RUN yarn build

EXPOSE 80
ENV PORT 80
ENV NODE_ENV production

CMD ["yarn", "start:server"]
