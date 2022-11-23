import Fastify from "fastify";

const server = Fastify({
  logger: true,
});

export { server };
