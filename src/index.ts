import { server } from "./server";
const PORT = process.env.PORT || 8080;

server.get("/", async (request, reply) => {
  reply.send({
    msg: "Deployed successfully",
  });
});

async function start(): Promise<void> {
  try {
    await server.listen({ port: Number(PORT), host: "0.0.0.0" });
    server.log.info(`Server started at ${PORT}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

start();
