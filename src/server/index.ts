import Fastify from "fastify";
import AutoLoad from "@fastify/autoload";
import { join } from "node:path";

const server = Fastify({
  logger: true,
});

server.register(AutoLoad, {
  dir: join(__dirname, "../plugins"),
});

server.register(AutoLoad, {
  dir: join(__dirname, "../routes"),
});

export { server };
