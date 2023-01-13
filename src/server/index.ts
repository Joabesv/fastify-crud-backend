import AutoLoad from '@fastify/autoload';
import { JWT } from '@fastify/jwt';
import Fastify, { FastifyInstance } from 'fastify';
import { Mongoose } from 'mongoose';
import { join } from 'node:path';
import { buildConfig, configProps } from '../config/configuration';
import { prettyLog } from '../utils/prettyLog';

type DecoratedFastifyInstance = FastifyInstance & {
  config?: configProps;
  jwt?: JWT;
  mongoose?: Mongoose;
};

export async function buildServer(): Promise<DecoratedFastifyInstance> {
  const config = buildConfig();
  const fastify: DecoratedFastifyInstance = Fastify({
    logger: {
      level: config.LOG_LEVEL as string,
      transport: prettyLog,
    },
  });

  try {
    fastify.decorate('config', config);
    await fastify.register(AutoLoad, {
      dir: join(__dirname, '../plugins'),
    });
    await fastify.register(AutoLoad, {
      dir: join(__dirname, '../routes'),
    });
    fastify.log.info('Registered all plugins!!');
  } catch (error) {
    fastify.log.error('Error registering plugins', error);
  }

  return fastify;
}
