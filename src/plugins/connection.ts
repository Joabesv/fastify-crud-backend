import { FastifyInstance } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import { Connection, connect } from 'mongoose';
import { buildConfig } from '../config/configuration';

interface FastifyMongooseOptions {
  readonly connection: Connection;
}

async function fastifyMongoose(
  fastify: FastifyInstance,
  options: FastifyMongooseOptions
): Promise<void> {
  try {
    const config = buildConfig();
    const connection = await connect(config.DATABASE_URL as string);
    fastify.decorate('mongoose', connection);
    fastify.log.info('Successfully registered Mongoose');
  } catch (err) {
    fastify.log.error(err, 'error connecting to the database');
    // guarantee the connection is closed, after application is stopped
    fastify.addHook('onClose', async () => {
      await options.connection.close();
    });
  }
}

export default fastifyPlugin(fastifyMongoose);
