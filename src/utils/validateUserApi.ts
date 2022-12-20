import { ZodError, z } from 'zod';

type ApiUser = {
  name: string;
  email: string;
  password: string;
};

const userRegisterSchema = z
  .object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
  })
  .required();

export async function validateUserApi(
  apiUser: ApiUser
): Promise<{ error: unknown; user: ApiUser | null }> {
  try {
    await userRegisterSchema.parseAsync(apiUser);
  } catch (err) {
    if (err instanceof ZodError) {
      return {
        error: err.message,
        user: null,
      };
    }

    return {
      error: err,
      user: null,
    };
  }

  return {
    user: apiUser,
    error: null,
  };
}
