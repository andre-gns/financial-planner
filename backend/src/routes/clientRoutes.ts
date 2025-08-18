import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import {
  createClientHandler,
  getClientsHandler,
  getClientHandler,
  updateClientHandler,
  deleteClientHandler,
} from "../controllers/clientController";
import {
  createClientSchema,
  updateClientSchema,
  clientParamsSchema,
} from "../schemas/clientSchema";

export async function clientRoutes(fastify: FastifyInstance) {
  const server = fastify.withTypeProvider<ZodTypeProvider>();

  server.post(
    "/",
    {
      schema: {
        body: createClientSchema,
      },
    },
    createClientHandler
  );

  server.get("/", getClientsHandler);

  server.get(
    "/:id",
    {
      schema: {
        params: clientParamsSchema,
      },
    },
    getClientHandler
  );

  server.put(
    "/:id",
    {
      schema: {
        params: clientParamsSchema,
        body: updateClientSchema,
      },
    },
    updateClientHandler
  );

  server.delete(
    "/:id",
    { schema: { params: clientParamsSchema } },
    deleteClientHandler
  );
}
