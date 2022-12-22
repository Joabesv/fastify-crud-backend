import type { FastifyReply, FastifyRequest } from 'fastify';
import { checkObjectId } from '../../helpers/apiHelpers';
import { UserModel } from '../../models/UserModel';
import { Params } from '../../models/schemas/userSchema';
import { getUserApi } from '../../utils/getUserApi';

export async function userDelete(
  request: FastifyRequest<{ Params: Params }>,
  reply: FastifyReply
): Promise<void> {
  const _id = checkObjectId(request.params.id);
  if (!_id) return reply.badRequest('User not found');
  const user = await UserModel.findOne({ _id, removedAt: null });
  if (!user) return reply.badRequest('User not found');

  try {
    await UserModel.updateOne(
      {
        _id: user._id,
      },
      {
        $set: { removedAt: new Date() },
      }
    );

    const { user: userUpdated, error } = await getUserApi(user._id);
    if (error) return reply.badRequest('Error while deleting user');

    return reply.status(200).send({
      user: userUpdated,
    });
  } catch (err) {
    return reply.internalServerError('Unknow server error');
  }
}
