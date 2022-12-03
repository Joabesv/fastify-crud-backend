import { Types } from 'mongoose';
import { UserModel } from '../models/UserModel';
import { UserPayload } from '../routes/user/userGet';
import { getObjectId } from './getObjectId';

const userSelection = {
  _id: 1,
  name: 1,
  email: 1,
  removedAt: 1,
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

export async function getUserApi(
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
