import type { FastifyInstance } from 'fastify';
import { userGet } from './userGet';
import { userGetAll } from './userGetAll';

// route prefix, can now be called with curl http://localhost:3000/api/user/

export const autoPrefix = '/api/user';

export default async (fastify: FastifyInstance): Promise<void> => {
  fastify.get('/', userGetAll);
  fastify.get('/:id', userGet);
};
