import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../utils/prisma";
import { z } from "zod";
import {
  createGoalSchema,
  updateGoalSchema,
  goalParamsSchema,
} from "../schemas/schemas";

type CreateGoalInput = z.infer<typeof createGoalSchema>;
type UpdateGoalInput = z.infer<typeof updateGoalSchema>;
type GoalParamsInput = z.infer<typeof goalParamsSchema>;

export async function createGoalHandler(
  request: FastifyRequest<{ Body: CreateGoalInput }>,
  reply: FastifyReply
) {
  try {
    const validatedBody = createGoalSchema.parse(request.body);
    const goal = await prisma.goal.create({ data: validatedBody });
    return reply.code(201).send(goal);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply
        .code(400)
        .send({ message: "Validation error", errors: error.issues });
    }
    return reply.code(500).send({ message: "Erro ao criar meta" });
  }
}

export async function getGoalsHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const goals = await prisma.goal.findMany();
  return reply.code(200).send(goals);
}

export async function getGoalHandler(
  request: FastifyRequest<{ Params: GoalParamsInput }>,
  reply: FastifyReply
) {
  try {
    const { id } = goalParamsSchema.parse(request.params);
    const goal = await prisma.goal.findUnique({ where: { id } });

    if (!goal) {
      return reply.code(404).send({ message: "Meta não encontrada" });
    }

    return reply.code(200).send(goal);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply
        .code(400)
        .send({ message: "Validation error", errors: error.issues });
    }
    return reply.code(500).send({ message: "Erro ao buscar meta" });
  }
}

export async function updateGoalHandler(
  request: FastifyRequest<{
    Params: GoalParamsInput;
    Body: UpdateGoalInput;
  }>,
  reply: FastifyReply
) {
  try {
    const { id } = goalParamsSchema.parse(request.params);
    const validatedBody = updateGoalSchema.parse(request.body);

    const goal = await prisma.goal.update({
      where: { id },
      data: validatedBody,
    });
    return reply.code(200).send(goal);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply
        .code(400)
        .send({ message: "Validation error", errors: error.issues });
    }
    return reply
      .code(404)
      .send({ message: "Meta não encontrada ou erro na atualização" });
  }
}

export async function deleteGoalHandler(
  request: FastifyRequest<{ Params: GoalParamsInput }>,
  reply: FastifyReply
) {
  try {
    const { id } = goalParamsSchema.parse(request.params);
    await prisma.goal.delete({ where: { id } });
    return reply.code(204).send();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply
        .code(400)
        .send({ message: "Validation error", errors: error.issues });
    }
    return reply.code(404).send({ message: "Meta não encontrada" });
  }
}
