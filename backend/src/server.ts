import Fastify from "fastify";
import { clientRoutes } from "./routes/clientRoutes";
import { goalRoutes } from "./routes/goalRoutes";
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";

const server = Fastify().withTypeProvider<ZodTypeProvider>();

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.register(clientRoutes);
server.register(goalRoutes);

server.get("/health", async (request, reply) => {
  return reply.code(200).send({ status: "ok" });
});

async function main() {
  try {
    const port = Number(process.env.PORT) || 3001;
    await server.listen({ port, host: "0.0.0.0" });
    console.log(`Servidor rodando em http://localhost:${port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

main();
