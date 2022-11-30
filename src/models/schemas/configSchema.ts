import S from 'fluent-json-schema';

export const configSchema = S.object()
  .required([
    'PORT',
    'LOG_LEVEL',
    'LOG_PRETTY_PRINT',
    'DATABASE_ENV',
    'DATABASE_URL',
    'JWT_SECRET',
  ])
  .prop('PORT', S.number().default(3000))
  .prop(
    'LOG_LEVEL',
    S.string().enum(['debug', 'info', 'error']).default('info')
  )
  .prop('LOG_PRETTY_PRINT', S.boolean().default(false))
  .prop(
    'DATABASE_ENVIRONMENT',
    S.string().enum(['development', 'production']).default('development')
  )
  .prop('DATABASE_URL', S.string())
  // ask for review about Secret possible types
  .prop('JWT_SECRET', S.string());
