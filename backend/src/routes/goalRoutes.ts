import { FastifyInstance } from "fastify";
import { z } from "zod";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import {
  createGoalSchema,
  updateGoalSchema,
  goalParamsSchema,
} from "../schemas/schemas";

// Importe os novos handlers
import {
  createGoalHandler,
  getGoalsHandler,
  getGoalHandler,
  updateGoalHandler,
  deleteGoalHandler,
} from "../controllers/goalController";

export async function goalRoutes(fastify: FastifyInstance) {
  const server = fastify.withTypeProvider<ZodTypeProvider>();

  // Rota para criar uma nova meta
  server.post("/", createGoalHandler);

  // Rota para listar todas as metas
  server.get("/", getGoalsHandler);

  // Rota para buscar uma meta por ID
  server.get("/:id", getGoalHandler);

  // Rota para atualizar uma meta
  server.put("/:id", updateGoalHandler);

  // Rota para deletar uma meta
  server.delete("/:id", deleteGoalHandler);
}
