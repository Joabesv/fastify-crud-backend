// gotta rename this part
import { FromSchema } from 'json-schema-to-ts';

const paramsSchema = {
  type: 'object',
  required: ['userId'],
  properties: {
    userId: { type: 'string' },
  },
} as const;

export type Params = FromSchema<typeof paramsSchema>;

const bodyUserSchema = {
  type: 'object',
  properties: {
    user: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        email: { type: 'string' },
        password: { type: 'string' },
      },
      required: ['name', 'email', 'password'],
    },
  },
  required: ['user'],
} as const;

export type UserRegistrationBody = FromSchema<typeof bodyUserSchema>;
