import type { FastifyInstance } from 'fastify';
import { userDelete } from './userDelete';
import { userGet } from './userGet';
import { userGetAll } from './userGetAll';
import { userPost } from './userPost';

// route prefix, can now be called with `curl http://localhost:3000/api/user/`

export const autoPrefix = '/api/user';

export default async (fastify: FastifyInstance): Promise<void> => {
  fastify.post('/', userPost);
  fastify.get('/', userGetAll);
  fastify.get('/:id', userGet);
  fastify.delete('/:id', userDelete);
};
