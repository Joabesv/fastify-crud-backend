import AutoLoad from '@fastify/autoload';
import Fastify from 'fastify';
import { join } from 'node:path';
import { buildConfig } from '../config/configuration';

const config = buildConfig();
const isPrettyPrintEnabled = config.LOG_PRETTY_PRINT ?? {
  target: 'pino-pretty',
};

const server = Fastify({
  logger: {
    level: config.LOG_LEVEL as string,
    transport: isPrettyPrintEnabled as any,
  },
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
