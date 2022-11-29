import type { SensibleOptions } from '@fastify/sensible';
import type { FastifyPluginAsync } from 'fastify';
import fastifyPlugin from 'fastify-plugin';

type SensiblePluginType = FastifyPluginAsync<SensibleOptions>;

const sensiblePlugin: SensiblePluginType = async (fastify, opts) => {
  try {
    await fastify.register(import('@fastify/sensible'));
    fastify.log.info('Successfully registered sensiblePlugin');
  } catch (err) {
    fastify.log.error('Plugin: Sensible, error on register', err);
  }
};

export default fastifyPlugin(sensiblePlugin);
