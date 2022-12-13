import { compareSync, hashSync } from 'bcryptjs';
import { Document, Model, model } from 'mongoose';
import { UserSchema } from './schemas/userMongoSchema';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  removedAt: Date;
  authenticate: (plainTextPassword: string) => boolean;
  encryptPassword: (password: string | undefined) => string;
}

// will try to translate to fastify-hooks
// i hate using `this` and ts, shouldn't be this messy
UserSchema.pre<IUser>('save', function encryptPasswordHook(next) {
  if (this.isModified('password')) {
    this.password = this.encryptPassword(this.password);
  }

  return next();
});

UserSchema.methods = {
  authenticate(plainTextPassword: string): boolean {
    return compareSync(plainTextPassword, this.password);
  },
  encryptPassword(password: string): string {
    return hashSync(password, 8);
  },
};

export const UserModel: Model<IUser> = model<IUser>('User', UserSchema);
