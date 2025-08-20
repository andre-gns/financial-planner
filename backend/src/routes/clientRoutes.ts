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
} from "../schemas/schemas";

export async function clientRoutes(fastify: FastifyInstance) {
  const server = fastify.withTypeProvider<ZodTypeProvider>();

  server.post("/", createClientHandler);

  server.get("/", getClientsHandler);

  server.get("/:id", getClientHandler);

  server.put("/:id", updateClientHandler);

  server.delete("/:id", deleteClientHandler);
}
