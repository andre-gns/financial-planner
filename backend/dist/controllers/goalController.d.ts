import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { createGoalSchema, updateGoalSchema, goalParamsSchema } from "../schemas/schemas";
type CreateGoalInput = z.infer<typeof createGoalSchema>;
type UpdateGoalInput = z.infer<typeof updateGoalSchema>;
type GoalParamsInput = z.infer<typeof goalParamsSchema>;
export declare function createGoalHandler(request: FastifyRequest<{
    Body: CreateGoalInput;
}>, reply: FastifyReply): Promise<never>;
export declare function getGoalsHandler(request: FastifyRequest, reply: FastifyReply): Promise<never>;
export declare function getGoalHandler(request: FastifyRequest<{
    Params: GoalParamsInput;
}>, reply: FastifyReply): Promise<never>;
export declare function updateGoalHandler(request: FastifyRequest<{
    Params: GoalParamsInput;
    Body: UpdateGoalInput;
}>, reply: FastifyReply): Promise<never>;
export declare function deleteGoalHandler(request: FastifyRequest<{
    Params: GoalParamsInput;
}>, reply: FastifyReply): Promise<never>;
export {};
