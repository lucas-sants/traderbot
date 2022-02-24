FROM node:lts-bullseye AS crypto-image

WORKDIR /app
COPY . .

RUN yarn install

# stage 2
FROM node:lts-bullseye-slim AS crypto-prod-image

WORKDIR /app
COPY package.json yarn.lock /app/

ENV NODE_ENV=staging
RUN yarn install --non-interactive --frozen-lockfile && yarn cache clean

CMD [ "yarn", "run", "start" ]