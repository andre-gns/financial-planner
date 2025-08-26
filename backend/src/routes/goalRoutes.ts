import { FastifyInstance } from "fastify";
import {
  createGoalHandler,
  getGoalsHandler,
  getGoalHandler,
  updateGoalHandler,
  deleteGoalHandler,
} from "../controllers/goalController";
import {
  createGoalSchema,
  updateGoalSchema,
  goalParamsSchema,
} from "../schemas/schemas";

export async function goalRoutes(server: FastifyInstance) {
  server.post(
    "/goals",
    { schema: { body: createGoalSchema } },
    createGoalHandler
  );
  server.get("/goals", getGoalsHandler);
  server.get(
    "/goals/:id",
    { schema: { params: goalParamsSchema } },
    getGoalHandler
  );
  server.put(
    "/goals/:id",
    { schema: { params: goalParamsSchema, body: updateGoalSchema } },
    updateGoalHandler
  );
  server.delete(
    "/goals/:id",
    { schema: { params: goalParamsSchema } },
    deleteGoalHandler
  );
}
