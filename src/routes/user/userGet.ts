import { FastifyReply, FastifyRequest } from 'fastify';
import { buildServer } from '../../server/';
import { getUserApi } from '../../utils/getUserApi';
import { Params } from './userSchema';

export type UserPayload = {
  _id: string;
  name: string;
  email: string;
};

export async function userGet(
  request: FastifyRequest<{ Params: Params }>,
  reply: FastifyReply
): Promise<void> {
  const { userId } = request.params;
  const serverInstance = await buildServer();
  try {
    if (!userId) {
      reply.badRequest('You must provide an id');
      return;
    }
    const { user, error } = await getUserApi(userId);
    if (error) {
      await reply.status(400).send(error);
      return;
    }

    return reply.status(200).send({ user });
  } catch (err) {
    serverInstance.log.error(err, 'error in server');
    return reply.internalServerError('Unknown error');
  }
}
