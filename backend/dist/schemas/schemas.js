"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.goalParamsSchema = exports.updateGoalSchema = exports.createGoalSchema = exports.clientParamsSchema = exports.updateClientSchema = exports.createClientSchema = void 0;
const zod_1 = require("zod");
exports.createClientSchema = zod_1.z.object({
    name: zod_1.z.string().min(3),
    email: zod_1.z.string().email(),
    age: zod_1.z.number().int().positive(),
    status: zod_1.z.enum(["active", "inactive"]).default("active"),
    familyProfile: zod_1.z.string().optional(),
});
exports.updateClientSchema = exports.createClientSchema.partial();
exports.clientParamsSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
});
exports.createGoalSchema = zod_1.z.object({
    title: zod_1.z.string().min(3),
    description: zod_1.z.string().optional(),
    targetAmount: zod_1.z.number().positive(),
    deadline: zod_1.z.string().datetime().optional(),
    clientId: zod_1.z.string().uuid(),
});
exports.updateGoalSchema = exports.createGoalSchema.partial();
exports.goalParamsSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
});
//# sourceMappingURL=schemas.js.map