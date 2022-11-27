import type { SensibleOptions } from '@fastify/sensible';
import type { FastifyPluginAsync } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import { server } from '../server';

const { log } = server;

type SensiblePluginType = FastifyPluginAsync<SensibleOptions>;

const sensiblePlugin: SensiblePluginType = async (fastify, opts) => {
  try {
    await fastify.register(import('@fastify/sensible'));
    log.info('Successfully registered sensiblePlugin');
  } catch (err) {
    log.error('Plugin: Sensible, error on register');
  }
};

export default fastifyPlugin(sensiblePlugin);
