import { FastifyReply, FastifyRequest } from 'fastify';
import { Types } from 'mongoose';
import { UserModel } from '../../models/UserModel';
import { buildServer } from '../../server/';
import { getObjectId } from '../../utils/getObjectId';
import { Params } from './userSchema';

const userSelection = {
  _id: 1,
  name: 1,
  email: 1,
  removedAt: 1,
};

type UserPayload = {
  _id: string;
  name: string;
  email: string;
};

type GetUserApiPayload = {
  error: string | null;
  user: UserPayload | null;
};

type GetConditionsOutput = {
  error: string | null;
  conditions?: {
    _id?: Types.ObjectId | null;
    email?: undefined | string;
  };
};

const getConditions = (id?: string, email?: string): GetConditionsOutput => {
  if (id !== undefined) {
    return {
      error: null,
      conditions: {
        _id: getObjectId(id),
      },
    };
  }

  if (email !== undefined) {
    return {
      error: null,
      conditions: {
        email,
      },
    };
  }

  return {
    error: 'Invalid user',
  };
};

async function getUserApi(
  id?: string,
  email?: string
): Promise<GetUserApiPayload> {
  const { error, conditions } = getConditions(id, email);

  if (error !== null) {
    return {
      error,
      user: null,
    };
  }

  const user = await UserModel.findOne({
    ...conditions,
  })
    .select(userSelection)
    .lean();

  if (user === null) {
    return {
      error: 'User not found',
      user: null,
    };
  }

  return {
    error: null,
    user,
  };
}

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
    if (error !== null) {
      await reply.status(400).send(error);
      return;
    }

    return reply.status(200).send({ user });
  } catch (err) {
    serverInstance.log.error(err, 'error in server');
    return reply.internalServerError('Unknown error');
  }
}
