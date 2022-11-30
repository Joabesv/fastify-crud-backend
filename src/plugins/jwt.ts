import type { FastifyJWTOptions } from '@fastify/jwt';
import type { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import { buildConfig } from '../config/configuration';

type JWTPluginType = FastifyPluginAsync<FastifyJWTOptions>;
const config = buildConfig();

const JWTPlugin: JWTPluginType = async (fastify, opts) => {
  const auth = async (
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<void> => {
    try {
      await request.jwtVerify();
    } catch (err) {
      await reply.send(err);
      fastify.log.error('Could not authenticate', err);
    }
  };

  try {
    await fastify.register(import('@fastify/jwt'), {
      secret: config.JWT_SECRET as string,
    });
    fastify.decorate('authenticate', auth);
    fastify.log.info('Successfully registered JWT');
  } catch (err) {
    fastify.log.error('Plugin: JWT, error on register', err);
  }
};

export default fastifyPlugin(JWTPlugin);
