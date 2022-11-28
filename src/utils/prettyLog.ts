import { PrettyOptions } from 'pino-pretty';
import { buildConfig } from '../config/configuration';

const config = buildConfig();

const options: PrettyOptions = {
  destination: 1,
  colorize: true,
  translateTime: 'HH:MM:ss.l',
  ignore: 'pid,hostname',
};

/* eslint-disable-next-line */
export const prettyLog = config.LOG_PRETTY_PRINT
  ? {
      target: 'pino-pretty',
      options,
    }
  : undefined;
