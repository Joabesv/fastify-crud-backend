import type { FastifyMongodbOptions } from '@fastify/mongodb';
import type { FastifyPluginAsync } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import { buildConfig } from '../config/configuration';

type MongoConnectionPluginType = FastifyPluginAsync<FastifyMongodbOptions>;
const config = buildConfig();

const mongoPlugin: MongoConnectionPluginType = async (fastify, opts) => {
  try {
    await fastify.register(import('@fastify/mongodb'), {
      forceClose: true,
      url: config.DATABASE_URL as string,
    });
    fastify.log.info('Successfully registered MongoPlugin');
  } catch (err) {
    fastify.log.error('Plugin: Mongo, error on register', err);
  }
};

export default fastifyPlugin(mongoPlugin);
