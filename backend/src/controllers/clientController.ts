import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../utils/prisma";
import { z } from "zod";
import {
  createClientSchema,
  updateClientSchema,
  clientParamsSchema,
} from "../schemas/clientSchema";

type CreateClientInput = z.infer<typeof createClientSchema>;
type UpdateClientInput = z.infer<typeof updateClientSchema>;
type ClientParamsInput = z.infer<typeof clientParamsSchema>;

export async function createClientHandler(
  request: FastifyRequest<{ Body: CreateClientInput }>,
  reply: FastifyReply
) {
  const data = request.body;
  try {
    const client = await prisma.client.create({ data });
    return reply.code(201).send(client);
  } catch (error) {
    return reply.code(500).send({ message: "Erro ao criar cliente" });
  }
}

export async function getClientsHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const clients = await prisma.client.findMany();
  return reply.code(200).send(clients);
}

export async function getClientHandler(
  request: FastifyRequest<{ Params: ClientParamsInput }>,
  reply: FastifyReply
) {
  const { id } = request.params;
  const client = await prisma.client.findUnique({ where: { id } });

  if (!client) {
    return reply.code(404).send({ message: "Cliente não encontrado" });
  }

  return reply.code(200).send(client);
}

export async function updateClientHandler(
  request: FastifyRequest<{
    Params: ClientParamsInput;
    Body: UpdateClientInput;
  }>,
  reply: FastifyReply
) {
  const { id } = request.params;
  const data = request.body;
  try {
    const client = await prisma.client.update({ where: { id }, data });
    return reply.code(200).send(client);
  } catch (error) {
    return reply
      .code(404)
      .send({ message: "Cliente não encontrado ou erro na atualização" });
  }
}

export async function deleteClientHandler(
  request: FastifyRequest<{ Params: ClientParamsInput }>,
  reply: FastifyReply
) {
  const { id } = request.params;
  try {
    await prisma.client.delete({ where: { id } });
    return reply.code(204).send(); // No content response
  } catch (error) {
    return reply.code(404).send({ message: "Cliente não encontrado" });
  }
}
