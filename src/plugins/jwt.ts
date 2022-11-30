import type { FastifyJWTOptions } from '@fastify/jwt';
import type { FastifyPluginAsync } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import { buildConfig } from '../config/configuration';

type JWTPluginType = FastifyPluginAsync<FastifyJWTOptions>;
const config = buildConfig();

const JWTPlugin: JWTPluginType = async (fastify, opts) => {
  try {
    await fastify.register(import('@fastify/jwt'), {
      secret: config.JWT_SECRET as string,
    });
    fastify.log.info('Successfully registered JWT');
  } catch (err) {
    fastify.log.error('Plugin: JWT, error on register', err);
  }
};

export default fastifyPlugin(JWTPlugin);
