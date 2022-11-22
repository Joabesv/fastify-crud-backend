# use slim, not alpine: the alpine ones are smaller but sometimes have issues with dns resolving
FROM node:18.12-slim

# it's recommended to run an app as a non-root user. Handily this image comes with a 'node' user
USER node
RUN mkdir -p /home/node/app
WORKDIR /home/node/app

COPY --chown=node:node package.json .
COPY --chown=node:node package-lock.json .

RUN npm ci --only=production
RUN npm run start:build

COPY --chown=node:node . .

ENV NODE_ENV="production"

CMD npm run start:prod