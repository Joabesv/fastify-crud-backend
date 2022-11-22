import Fastify from "fastify";

const app = Fastify({
  logger: true,
});
const PORT = (process.env.PORT || 8080) as number;

app.get("/", async (request, reply) => {
  reply.send({
    msg: "Deployed successfully",
  });
});

const start = async () => {
  try {
    await app.listen({ port: PORT, host: "0.0.0.0" });
    app.log.info(`Server started at ${PORT}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
