"use strict";
/// <reference types="@prisma/client" />
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGoalHandler = createGoalHandler;
exports.getGoalsHandler = getGoalsHandler;
exports.getGoalHandler = getGoalHandler;
exports.updateGoalHandler = updateGoalHandler;
exports.deleteGoalHandler = deleteGoalHandler;
const prisma_1 = require("../utils/prisma");
const zod_1 = require("zod");
const schemas_1 = require("../schemas/schemas");
async function createGoalHandler(request, reply) {
    try {
        const validatedBody = schemas_1.createGoalSchema.parse(request.body);
        const goal = await prisma_1.prisma.goal.create({ data: validatedBody });
        return reply.code(201).send(goal);
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            return reply
                .code(400)
                .send({ message: "Validation error", errors: error.issues });
        }
        return reply.code(500).send({ message: "Erro ao criar meta" });
    }
}
async function getGoalsHandler(request, reply) {
    const goals = await prisma_1.prisma.goal.findMany();
    return reply.code(200).send(goals);
}
async function getGoalHandler(request, reply) {
    try {
        const { id } = schemas_1.goalParamsSchema.parse(request.params);
        const goal = await prisma_1.prisma.goal.findUnique({ where: { id } });
        if (!goal) {
            return reply.code(404).send({ message: "Meta não encontrada" });
        }
        return reply.code(200).send(goal);
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            return reply
                .code(400)
                .send({ message: "Validation error", errors: error.issues });
        }
        return reply.code(500).send({ message: "Erro ao buscar meta" });
    }
}
async function updateGoalHandler(request, reply) {
    try {
        const { id } = schemas_1.goalParamsSchema.parse(request.params);
        const validatedBody = schemas_1.updateGoalSchema.parse(request.body);
        const goal = await prisma_1.prisma.goal.update({
            where: { id },
            data: validatedBody,
        });
        return reply.code(200).send(goal);
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            return reply
                .code(400)
                .send({ message: "Validation error", errors: error.issues });
        }
        return reply
            .code(404)
            .send({ message: "Meta não encontrada ou erro na atualização" });
    }
}
async function deleteGoalHandler(request, reply) {
    try {
        const { id } = schemas_1.goalParamsSchema.parse(request.params);
        await prisma_1.prisma.goal.delete({ where: { id } });
        return reply.code(204).send();
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            return reply
                .code(400)
                .send({ message: "Validation error", errors: error.issues });
        }
        return reply.code(404).send({ message: "Meta não encontrada" });
    }
}
//# sourceMappingURL=goalController.js.map