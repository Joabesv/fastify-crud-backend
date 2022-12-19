import { FromSchema } from 'json-schema-to-ts';

const paramsSchema = {
  type: 'object',
  required: ['userId'],
  properties: {
    userId: { type: 'string' },
  },
} as const;

export type Params = FromSchema<typeof paramsSchema>;
