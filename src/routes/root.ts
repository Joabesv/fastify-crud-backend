import type { FastifyPluginAsync } from 'fastify';

const root: FastifyPluginAsync = async (fastify, opts) => {
  const { log } = fastify;

  fastify.get('/', async (request, reply) => {
    try {
      log.info('root route is working');
      return reply.code(200).send({ msg: 'Welcome to my deploy on fly' });
    } catch (error) {
      log.error('[Error root route]', error);
    }
  });
};

export default root;
