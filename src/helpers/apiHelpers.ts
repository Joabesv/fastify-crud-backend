import type { FastifyRequest } from 'fastify';
import { Model } from 'mongoose';
import { IUser } from '../models/UserModel';

type SkipAndLimit = {
  skip: null | number;
  limit: null | number;
  errors: Array<{
    data: {
      skip: number;
      limit: number;
    };
    message: string;
  }> | null;
};

export function getSkipAndLimit(
  request: FastifyRequest<{ Querystring: Query }>
): SkipAndLimit {
  const { skip = 0, limit = 100 } = request.query;

  if (skip < 0 || limit < 0) {
    return {
      skip: null,
      limit: null,
      errors: [
        {
          data: { skip, limit },
          message: 'Pagination values should be positive values',
        },
      ],
    };
  }

  const mongoLimit = Math.min(parseInt(limit, 10), 100);
  const mongoSkip = parseInt(skip, 10);

  return {
    skip: mongoSkip,
    limit: mongoLimit,
    errors: null,
  };
}

type ErrorValidate = {
  data: {};
  message: string;
};

type PageInfo = {
  errors?: ErrorValidate[];
  skip: number | null;
  limit: number | null;
  totalCount: number | null;
  hasPreviousPage: number | boolean | null;
  hasNextPage: number | boolean | null;
};

// TODO: fix typing
type Query = {
  skip: any;
  limit: any;
};

export async function getPageInfo(
  request: FastifyRequest<{ Querystring: Query }>,
  model: Model<IUser>
): Promise<PageInfo> {
  const { skip, limit, errors } = getSkipAndLimit(request);

  if (errors) {
    return {
      errors,
      skip,
      limit,
      totalCount: null,
      hasNextPage: null,
      hasPreviousPage: null,
    };
  }

  const conditionsTotalCount = {
    removedAt: null as any, // review later
  };

  const totalCount = await model.count(conditionsTotalCount);
  const hasPreviousPage = skip > 0;
  const hasNextPage = Number(skip) + Number(limit) < totalCount;

  return {
    skip,
    limit,
    totalCount,
    hasPreviousPage,
    hasNextPage,
  };
}
