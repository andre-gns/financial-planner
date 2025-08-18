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
