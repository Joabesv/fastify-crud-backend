import { FromSchema } from 'json-schema-to-ts';

const loginSchema = {
  type: 'object',
  required: ['email', 'password'],
  properties: {
    email: { type: 'string' },
    password: { type: 'string' },
  },
} as const;

export type Body = FromSchema<typeof loginSchema>;
