import type { FastifyInstance } from 'fastify';
import { authLogin } from './authLogin';

export const autoPrefix = '/api/auth/login';

export default async (fastify: FastifyInstance): Promise<void> => {
  fastify.post('/', authLogin);
};
