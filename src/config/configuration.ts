import { EnvSchemaData, EnvSchemaOpt, envSchema } from 'env-schema';
import S from 'fluent-json-schema';
import { Level } from 'pino';

const configSchema = S.object()
  .required([
    'PORT',
    'LOG_LEVEL',
    'LOG_PRETTY_PRINT',
    'DATABASE_ENV',
    'DATABASE_URL',
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
  .prop('DATABASE_URL', S.string());

// there's probably a better way to do this
export interface configProps {
  PORT: number;
  LOG_LEVEL: Level;
  LOG_PRETTY_PRINT: boolean;
  DATABASE_ENV: string;
  DATABASE_URL: string;
}

export function buildConfig(): EnvSchemaData {
  const envSchemaOptions: EnvSchemaOpt = {
    schema: configSchema,
    dotenv: true,
  };

  return envSchema(envSchemaOptions);
}
