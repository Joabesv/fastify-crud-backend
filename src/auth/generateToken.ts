import type { FastifyInstance } from 'fastify';
import { buildConfig } from '../config/configuration';
import { IUser } from '../models/UserModel';

const config = buildConfig();
let instance: FastifyInstance;

export function generateToken(user: IUser): string {
  /* eslint-disable-next-line */
  if (!config.JWT_SECRET) {
    throw new Error('Please provide a secret');
  }

  return `JWT ${instance.jwt.sign({ user: user._id }, config.JWT_SECRET)}`;
}
