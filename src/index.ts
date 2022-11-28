import { buildServer } from './server';

async function start(): Promise<void> {
  const server = await buildServer();
  const PORT = server.config?.PORT;
  try {
    await server.listen({ port: PORT, host: '0.0.0.0' });
    server.log.info(`Server started at ${PORT}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

/* eslint-disable-next-line */
start();
