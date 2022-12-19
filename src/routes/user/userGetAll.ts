import type { FastifyReply, FastifyRequest } from 'fastify';
import { Query, getPageInfo, getSkipAndLimit } from '../../helpers/apiHelpers';
import { UserModel } from '../../models/UserModel';
import { buildServer } from '../../server';
import { userSelection } from '../../utils/getUserApi';

export async function userGetAll(
  request: FastifyRequest<{ Querystring: Query }>,
  reply: FastifyReply
): Promise<void> {
  const { skip, limit } = getSkipAndLimit(request);
  const serverInstance = await buildServer();

  try {
    const users = await UserModel.find({
      removedAt: null,
    })
      .skip(skip)
      .limit(limit)
      .select(userSelection)
      .lean();

    const pageInfo = await getPageInfo(request, UserModel);

    if (pageInfo.errors) {
      return reply.status(422).send({ errors: pageInfo.errors });
    }

    return reply.status(200).send({
      pageInfo,
      users,
    });
  } catch (error) {
    serverInstance.log.error(error, 'error in server');
    return reply.internalServerError('Unknown error');
  }
}
