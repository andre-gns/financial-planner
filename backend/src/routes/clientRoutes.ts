import { FastifyInstance } from "fastify";
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

export async function clientRoutes(server: FastifyInstance) {
  server.post(
    "/clients",
    { schema: { body: createClientSchema } },
    createClientHandler
  );
  server.get("/clients", getClientsHandler);
  server.get(
    "/clients/:id",
    { schema: { params: clientParamsSchema } },
    getClientHandler
  );
  server.put(
    "/clients/:id",
    { schema: { params: clientParamsSchema, body: updateClientSchema } },
    updateClientHandler
  );
  server.delete(
    "/clients/:id",
    { schema: { params: clientParamsSchema } },
    deleteClientHandler
  );
}
