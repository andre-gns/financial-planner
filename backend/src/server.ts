import Fastify from "fastify";
import { clientRoutes } from "./routes/clientRoutes";
import { ZodTypeProvider } from "fastify-type-provider-zod";

const app = Fastify({
  logger: true,
}).withTypeProvider<ZodTypeProvider>();

app.register(clientRoutes, { prefix: "/api/clients" });

const start = async () => {
  try {
    await app.listen({ port: 3001 });
    console.log("Servidor rodando em http://localhost:3001");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
