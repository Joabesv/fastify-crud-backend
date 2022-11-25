import Fastify from 'fastify';
import AutoLoad from '@fastify/autoload';
import { join } from 'node:path';

const server = Fastify({
  logger: true,
});

/* eslint-disable-next-line */
server.register(AutoLoad, {
  dir: join(__dirname, '../plugins'),
});

/* eslint-disable-next-line */
server.register(AutoLoad, {
  dir: join(__dirname, '../routes'),
});

export { server };
