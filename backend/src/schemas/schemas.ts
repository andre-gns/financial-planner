import { z } from "zod";

export const createClientSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  age: z.number().int().positive(),
  status: z.enum(["active", "inactive"]).default("active"),
  familyProfile: z.string().optional(),
});

export const updateClientSchema = createClientSchema.partial();

export const clientParamsSchema = z.object({
  id: z.string().uuid(),
});

export const createGoalSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  targetAmount: z.number().positive(),
  deadline: z.string().datetime().optional(),
  clientId: z.string().uuid(),
});

export const updateGoalSchema = createGoalSchema.partial();

export const goalParamsSchema = z.object({
  id: z.string().uuid(),
});
