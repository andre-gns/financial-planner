import { PrismaClient } from "@prisma/client";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import {
  createGoalSchema,
  updateGoalSchema,
  goalParamsSchema,
} from "../schemas/schemas";

const prisma = new PrismaClient();

// Cria uma meta
export async function createGoalHandler(
  request: FastifyRequest<{ Body: z.infer<typeof createGoalSchema> }>,
  reply: FastifyReply
) {
  try {
    const validatedBody = createGoalSchema.parse(request.body);
    const goal = await prisma.goal.create({ data: validatedBody });
    return reply.code(201).send(goal);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply.code(400).send({
        message: "Validation error",
        errors: error.issues,
      });
    }
    return reply.code(500).send({ message: "Erro ao criar meta" });
  }
}

// Lista todas as metas
export async function getGoalsHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const goals = await prisma.goal.findMany();
    return reply.code(200).send(goals);
  } catch (error) {
    return reply.code(500).send({ message: "Erro ao listar metas" });
  }
}

// Obtém uma única meta por ID
export async function getGoalHandler(
  request: FastifyRequest<{ Params: z.infer<typeof goalParamsSchema> }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    const goal = await prisma.goal.findUnique({
      where: { id },
    });
    if (!goal) {
      return reply.code(404).send({ message: "Meta não encontrada" });
    }
    return reply.code(200).send(goal);
  } catch (error) {
    return reply.code(500).send({ message: "Erro ao obter meta" });
  }
}

// Atualiza uma meta (PUT)
export async function updateGoalHandler(
  request: FastifyRequest<{
    Params: z.infer<typeof goalParamsSchema>;
    Body: z.infer<typeof updateGoalSchema>;
  }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    const validatedBody = updateGoalSchema.parse(request.body);
    const goal = await prisma.goal.update({
      where: { id },
      data: validatedBody,
    });
    return reply.code(200).send(goal);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply.code(400).send({
        message: "Validation error",
        errors: error.issues,
      });
    }
    return reply.code(500).send({ message: "Erro ao atualizar meta" });
  }
}

// Exclui uma meta (DELETE)
export async function deleteGoalHandler(
  request: FastifyRequest<{
    Params: z.infer<typeof goalParamsSchema>;
  }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    await prisma.goal.delete({
      where: { id },
    });
    return reply.code(204).send();
  } catch (error) {
    return reply.code(500).send({ message: "Erro ao deletar meta" });
  }
}
