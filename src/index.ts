import Fastify from "fastify";
const app = Fastify();
const PORT = (process.env.PORT || 3000) as number;

app.listen({ port: PORT, host: "0.0.0.0" });
