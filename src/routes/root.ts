import type { FastifyPluginAsync } from 'fastify';
import { generateToken } from '../auth/generateToken';

const root: FastifyPluginAsync = async (fastify, opts) => {
  const { log } = fastify;

  fastify.get('/', async (request, reply) => {
    try {
      log.info('root route is working');
      return reply.code(200).send({ msg: 'Welcome to my fastify-crud' });
    } catch (error) {
      log.error(error, 'root route error');
    }
  });
};

export default root;
