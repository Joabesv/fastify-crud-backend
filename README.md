# Fastify backend Implementation
Backend implementation using Fastify to build a REST API.
Any help is welcome!

## run
- run `pnpm i` to install dependencies

- create a new file `.env` and fill it with the `.env.example` content

- run `pnpm start:db` to create docker container with mongodb

- after those steps, start the dev server `pnpm start:dev`

see the api on http://localhost:3000

### MongoDB
- [x] create connection with MongoDB
- [x] create user model

### APIs
- [x] GET user
- [x] GET ALL create user
- [x] POST user https://github.com/daniloab/koa-crud-backend/issues/10
  - [x] implement body values validation with zod maybe;
  - [x] create new user if valid
  - [x] validate if user exists and return
- [x] DELETE user

### Auth Flow
- [x] login
- [] validate user token
- [] sign up

## follow me
[Twitter](https://www.twitter.com/Joabesv)
