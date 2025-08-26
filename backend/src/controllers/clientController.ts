import { PrismaClient } from "@prisma/client";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import {
  clientParamsSchema,
  createClientSchema,
  updateClientSchema,
} from "../schemas/schemas";

const prisma = new PrismaClient();

// Cria um cliente
export async function createClientHandler(
  request: FastifyRequest<{ Body: z.infer<typeof createClientSchema> }>,
  reply: FastifyReply
) {
  try {
    const validatedBody = createClientSchema.parse(request.body);
    const client = await prisma.client.create({ data: validatedBody });
    return reply.code(201).send(client);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply.code(400).send({
        message: "Validation error",
        errors: error.issues,
      });
    }
    return reply.code(500).send({ message: "Erro ao criar cliente" });
  }
}

// Lista todos os clientes
export async function getClientsHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const clients = await prisma.client.findMany();
    return reply.code(200).send(clients);
  } catch (error) {
    return reply.code(500).send({ message: "Erro ao listar clientes" });
  }
}

// Obtém um único cliente por ID
export async function getClientHandler(
  request: FastifyRequest<{ Params: z.infer<typeof clientParamsSchema> }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    const client = await prisma.client.findUnique({
      where: { id },
    });
    if (!client) {
      return reply.code(404).send({ message: "Cliente não encontrado" });
    }
    return reply.code(200).send(client);
  } catch (error) {
    return reply.code(500).send({ message: "Erro ao obter cliente" });
  }
}

// Atualiza um cliente (PUT)
export async function updateClientHandler(
  request: FastifyRequest<{
    Params: z.infer<typeof clientParamsSchema>;
    Body: z.infer<typeof updateClientSchema>;
  }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    const validatedBody = updateClientSchema.parse(request.body);
    const client = await prisma.client.update({
      where: { id },
      data: validatedBody,
    });
    return reply.code(200).send(client);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply.code(400).send({
        message: "Validation error",
        errors: error.issues,
      });
    }
    return reply.code(500).send({ message: "Erro ao atualizar cliente" });
  }
}

// Exclui um cliente (DELETE)
export async function deleteClientHandler(
  request: FastifyRequest<{
    Params: z.infer<typeof clientParamsSchema>;
  }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    await prisma.client.delete({
      where: { id },
    });
    return reply.code(204).send(); // 204 indica sucesso sem conteúdo
  } catch (error) {
    return reply.code(500).send({ message: "Erro ao deletar cliente" });
  }
}
