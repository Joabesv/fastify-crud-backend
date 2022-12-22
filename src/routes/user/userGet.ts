import { FastifyReply, FastifyRequest } from 'fastify';
import { Params } from '../../models/schemas/userSchema';
import { buildServer } from '../../server/';
import { getUserApi } from '../../utils/getUserApi';

export type UserPayload = {
  _id: string;
  name: string;
  email: string;
};

export async function userGet(
  request: FastifyRequest<{ Params: Params }>,
  reply: FastifyReply
): Promise<void> {
  const { id } = request.params;
  const serverInstance = await buildServer();
  try {
    if (!id) {
      reply.badRequest('You must provide an id');
      return;
    }
    const { user, error } = await getUserApi(id);

    if (error) {
      reply.badRequest(error);
      return;
    }

    return reply.status(200).send({ user });
  } catch (err) {
    serverInstance.log.error(err, 'error in server');
    return reply.internalServerError('Unknown error');
  }
}
