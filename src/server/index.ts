import AutoLoad from '@fastify/autoload';
import Fastify, { FastifyInstance } from 'fastify';
import { join } from 'node:path';
import { buildConfig, configProps } from '../config/configuration';
import { prettyLog } from '../utils/prettyLog';

type decoratedFastifyInstance = FastifyInstance & { config?: configProps };

export async function buildServer(): Promise<decoratedFastifyInstance> {
  const config = buildConfig();
  const fastify: decoratedFastifyInstance = Fastify({
    logger: {
      level: config.LOG_LEVEL as string,
      transport: prettyLog,
    },
  });

  try {
    fastify.decorate('config', config);
    const pluginsToRegister = [
      fastify.register(AutoLoad, {
        dir: join(__dirname, '../plugins'),
      }),
      fastify.register(AutoLoad, {
        dir: join(__dirname, '../routes'),
      }),
    ];
    await Promise.allSettled(pluginsToRegister);
    fastify.log.info('Registered all plugins!!');
  } catch (error) {
    fastify.log.error('Error registering plugins', error);
  }

  return fastify;
}
