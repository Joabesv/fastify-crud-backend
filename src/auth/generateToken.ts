import { buildConfig } from '../config/configuration';
import { IUser } from '../models/UserModel';
import { buildServer } from '../server';

export async function generateToken(user: IUser): Promise<string> {
  const { jwt } = await buildServer();
  const config = buildConfig();
  /* eslint-disable-next-line */
  if (!config.JWT_SECRET) {
    throw new Error('Please provide a secret');
  }

  return `JWT ${jwt.sign({ user: user._id }, config.JWT_SECRET)}`;
}
