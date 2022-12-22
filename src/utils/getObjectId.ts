import { fromGlobalId } from 'graphql-relay';
import { Types } from 'mongoose';

// returns an ObjectId given an param of unknown type
export function getObjectId(target: unknown | any): Types.ObjectId | null {
  if (target instanceof Types.ObjectId) {
    return new Types.ObjectId(target.toString());
  }

  if (typeof target === 'object') {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    return target._id ? new Types.ObjectId(target._id) : null;
  }

  if (Types.ObjectId.isValid(target)) {
    return new Types.ObjectId(target.toString());
  }

  if (typeof target === 'string') {
    const result = fromGlobalId(target);
    const isTypeAndIdValid: boolean =
      Boolean(result.type) && Boolean(result.id);

    if (isTypeAndIdValid && Types.ObjectId.isValid(result.id)) {
      return new Types.ObjectId(result.id);
    }

    if (Types.ObjectId.isValid(target)) {
      return new Types.ObjectId(target);
    }

    return null;
  }

  return null;
}
