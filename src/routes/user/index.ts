import type { FastifyInstance } from 'fastify';
import { userGet } from './userGet';

// route prefix, can now be called with curl http://localhost:3000/api/user/

export const autoPrefix = '/api/user';

export default async (fastify: FastifyInstance): Promise<void> => {
  fastify.get('/:id', userGet);
};
