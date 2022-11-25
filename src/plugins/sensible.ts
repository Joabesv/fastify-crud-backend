import type { FastifyPluginAsync } from "fastify";
import type { SensibleOptions } from "@fastify/sensible";
import { server } from "../server";
import fastifyPlugin from "fastify-plugin";
const { log } = server;

type sensiblePluginType = FastifyPluginAsync<SensibleOptions>;

const sensiblePlugin: sensiblePluginType = async (fastify, opts) => {
  try {
    await fastify.register(import("@fastify/sensible"));
    log.info("Successfully registered sensiblePlugin");
  } catch (err) {
    log.error("Plugin: Sensible, error on register");
  }
};

export default fastifyPlugin(sensiblePlugin);
