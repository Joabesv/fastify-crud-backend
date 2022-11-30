import { EnvSchemaData, EnvSchemaOpt, envSchema } from 'env-schema';
import { Level } from 'pino';
import { configSchema } from '../models/schemas/configSchema';

// there's probably a better way to do this
export interface configProps {
  PORT: number;
  LOG_LEVEL: Level;
  LOG_PRETTY_PRINT: boolean;
  DATABASE_ENV: string;
  DATABASE_URL: string;
  JWT_SECRET: string;
}

export function buildConfig(): EnvSchemaData {
  const envSchemaOptions: EnvSchemaOpt = {
    schema: configSchema,
    dotenv: true,
  };

  return envSchema(envSchemaOptions);
}
