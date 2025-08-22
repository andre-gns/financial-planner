"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClientHandler = createClientHandler;
exports.getClientsHandler = getClientsHandler;
exports.getClientHandler = getClientHandler;
exports.updateClientHandler = updateClientHandler;
exports.deleteClientHandler = deleteClientHandler;
const prisma_1 = require("../utils/prisma");
const zod_1 = require("zod");
const schemas_1 = require("../schemas/schemas");
async function createClientHandler(request, reply) {
    // Validação do corpo da requisição
    try {
        const validatedBody = schemas_1.createClientSchema.parse(request.body);
        const client = await prisma_1.prisma.client.create({ data: validatedBody });
        return reply.code(201).send(client);
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            return reply
                .code(400)
                .send({ message: "Validation error", errors: error.issues });
        }
        console.error(error); // Log do erro para depuração
        return reply.code(500).send({ message: "Erro ao criar cliente" });
    }
}
async function getClientsHandler(request, reply) {
    const clients = await prisma_1.prisma.client.findMany();
    return reply.code(200).send(clients);
}
async function getClientHandler(request, reply) {
    try {
        const { id } = schemas_1.clientParamsSchema.parse(request.params);
        const client = await prisma_1.prisma.client.findUnique({ where: { id } });
        if (!client) {
            return reply.code(404).send({ message: "Cliente não encontrado" });
        }
        return reply.code(200).send(client);
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            return reply
                .code(400)
                .send({ message: "Validation error", errors: error.issues });
        }
        return reply.code(500).send({ message: "Erro ao buscar cliente" });
    }
}
async function updateClientHandler(request, reply) {
    try {
        const { id } = schemas_1.clientParamsSchema.parse(request.params);
        const validatedBody = schemas_1.updateClientSchema.parse(request.body);
        const client = await prisma_1.prisma.client.update({
            where: { id },
            data: validatedBody,
        });
        return reply.code(200).send(client);
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            return reply
                .code(400)
                .send({ message: "Validation error", errors: error.issues });
        }
        return reply
            .code(404)
            .send({ message: "Cliente não encontrado ou erro na atualização" });
    }
}
async function deleteClientHandler(request, reply) {
    //
    try {
        const { id } = schemas_1.clientParamsSchema.parse(request.params);
        await prisma_1.prisma.client.delete({ where: { id } });
        return reply.code(204).send(); // No content response
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            return reply
                .code(400)
                .send({ message: "Validation error", errors: error.issues });
        }
        return reply.code(404).send({ message: "Cliente não encontrado" });
    }
}
//# sourceMappingURL=clientController.js.map