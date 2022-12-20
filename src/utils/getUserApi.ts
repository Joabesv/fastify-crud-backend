import { Types } from 'mongoose';
import { UserModel } from '../models/UserModel';
import { UserPayload } from '../routes/user/userGet';
import { getObjectId } from './getObjectId';

export const userSelection = {
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
  if (id) {
    return {
      error: null,
      conditions: {
        _id: getObjectId(id),
      },
    };
  }

  if (email) {
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
  id?: string | null,
  email?: string
): Promise<GetUserApiPayload> {
  const { error, conditions } = getConditions(id, email);

  if (error) {
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

  if (user) {
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
