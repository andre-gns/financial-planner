import { FastifyReply, FastifyRequest } from "fastify";
import { clientsDb } from "../utils/inMemoryDatabase";
import { z } from "zod";
import {
  createClientSchema,
  updateClientSchema,
  clientParamsSchema,
} from "../schemas/schemas";

type CreateClientInput = z.infer<typeof createClientSchema>;
type UpdateClientInput = z.infer<typeof updateClientSchema>;
type ClientParamsInput = z.infer<typeof clientParamsSchema>;

export async function createClientHandler(
  request: FastifyRequest<{ Body: CreateClientInput }>,
  reply: FastifyReply
) {
  //
  try {
    const validatedBody = createClientSchema.parse(request.body);

    const client = clientsDb.create(validatedBody);
    return reply.code(201).send(client);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply
        .code(400)
        .send({ message: "Validation error", errors: error.issues });
    }
    console.error(error);
    return reply.code(500).send({ message: "Erro ao criar cliente" });
  }
}

export async function getClientsHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const clients = clientsDb.findMany();
  return reply.code(200).send(clients);
}

export async function getClientHandler(
  request: FastifyRequest<{ Params: ClientParamsInput }>,
  reply: FastifyReply
) {
  try {
    const { id } = clientParamsSchema.parse(request.params);

    const client = clientsDb.findUnique(id);

    if (!client) {
      return reply.code(404).send({ message: "Cliente não encontrado" });
    }

    return reply.code(200).send(client);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply
        .code(400)
        .send({ message: "Validation error", errors: error.issues });
    }
    return reply.code(500).send({ message: "Erro ao buscar cliente" });
  }
}

export async function updateClientHandler(
  request: FastifyRequest<{
    Params: ClientParamsInput;
    Body: UpdateClientInput;
  }>,
  reply: FastifyReply
) {
  try {
    const { id } = clientParamsSchema.parse(request.params);
    const validatedBody = updateClientSchema.parse(request.body);

    const client = clientsDb.update(id, validatedBody);

    if (!client) {
      return reply
        .code(404)
        .send({ message: "Cliente não encontrado ou erro na atualização" });
    }

    return reply.code(200).send(client);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply
        .code(400)
        .send({ message: "Validation error", errors: error.issues });
    }
    return reply
      .code(404)
      .send({ message: "Cliente não encontrado ou erro na atualização" });
  }
}

export async function deleteClientHandler(
  request: FastifyRequest<{ Params: ClientParamsInput }>,
  reply: FastifyReply
) {
  //
  try {
    const { id } = clientParamsSchema.parse(request.params);

    clientsDb.delete(id);
    return reply.code(204).send(); // No content response
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply
        .code(400)
        .send({ message: "Validation error", errors: error.issues });
    }
    return reply.code(404).send({ message: "Cliente não encontrado" });
  }
}
