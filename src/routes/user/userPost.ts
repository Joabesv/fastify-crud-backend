import type { FastifyReply, FastifyRequest } from 'fastify';
import { UserModel } from '../../models/UserModel';
import { UserRegistrationBody } from '../../models/schemas/userSchema';
import { getUserApi } from '../../utils/getUserApi';
import { validateUserApi } from '../../utils/validateUserApi';

export async function userPost(
  request: FastifyRequest<{ Body: UserRegistrationBody }>,
  reply: FastifyReply
): Promise<void> {
  const { user } = request.body;

  if (!user) {
    return reply.badRequest('User is required');
  }

  const { user: userValidated, error } = await validateUserApi(user);

  if (error) {
    return reply.status(400).send({ message: error });
  }

  const { user: userExist } = await getUserApi(null, userValidated?.email);

  if (userExist) {
    return reply.badRequest('email already in use');
  }

  try {
    const newUser = await new UserModel({ ...userValidated }).save();

    const { user: userNormalized, error } = await getUserApi(newUser._id);

    if (error) {
      return reply.badRequest(error);
    }

    return reply.status(201).send({ user: userNormalized });
  } catch (err) {
    // only for now
    console.error('deu ruim', err);

    return reply.internalServerError('Server error');
  }
}
