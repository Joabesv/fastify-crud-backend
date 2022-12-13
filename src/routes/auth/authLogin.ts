import type { FastifyReply, FastifyRequest } from 'fastify';
import { generateToken } from '../../auth/generateToken';
import { UserModel } from '../../models/UserModel';
import { Body } from '../../models/schemas/loginSchema';

export const autoPrefix = '/api/auth/login';

export async function authLogin(
  request: FastifyRequest<{ Body: Body }>,
  reply: FastifyReply
): Promise<void> {
  const { email, password } = request.body;
  const isEmailAndPwdValid = !email || !password;

  if (isEmailAndPwdValid) {
    return reply.unauthorized('Email or password incorrect');
  }

  const user = await UserModel.findOne({
    email,
    removedAt: null,
  });

  if (!user) {
    return reply.notFound('User not found');
  }
  return reply.code(200).send({
    message: 'User authenticate with success',
    token: generateToken(user),
  });
}
