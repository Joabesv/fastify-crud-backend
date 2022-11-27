import { EnvSchemaData, EnvSchemaOpt, envSchema } from 'env-schema';
import S from 'fluent-json-schema';

const configSchema = S.object()
  .required([
    'PORT',
    'LOG_LEVEL',
    'LOG_PRETTY_PRINT',
    'DATABASE_ENV',
    'DATABASE_URL',
  ])
  .prop('PORT', S.string().default(3000))
  .prop(
    'LOG_LEVEL',
    S.string().enum(['debug', 'info', 'error']).default('info')
  )
  .prop('LOG_PRETTY_PRINT', S.boolean().default(false))
  .prop(
    'DATABASE_ENVIRONMENT',
    S.string().enum(['development', 'production']).default('development')
  )
  .prop('DATABASE_URL', S.string());

export function buildConfig(): EnvSchemaData {
  const envSchemaOptions: EnvSchemaOpt = {
    schema: configSchema,
    dotenv: true,
  };

  return envSchema(envSchemaOptions);
}
