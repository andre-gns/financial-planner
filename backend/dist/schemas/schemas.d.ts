import { z } from "zod";
export declare const createClientSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    age: z.ZodNumber;
    status: z.ZodDefault<z.ZodEnum<{
        active: "active";
        inactive: "inactive";
    }>>;
    familyProfile: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const updateClientSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    age: z.ZodOptional<z.ZodNumber>;
    status: z.ZodOptional<z.ZodDefault<z.ZodEnum<{
        active: "active";
        inactive: "inactive";
    }>>>;
    familyProfile: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
export declare const clientParamsSchema: z.ZodObject<{
    id: z.ZodString;
}, z.core.$strip>;
export declare const createGoalSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    targetAmount: z.ZodNumber;
    deadline: z.ZodOptional<z.ZodString>;
    clientId: z.ZodString;
}, z.core.$strip>;
export declare const updateGoalSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    targetAmount: z.ZodOptional<z.ZodNumber>;
    deadline: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    clientId: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const goalParamsSchema: z.ZodObject<{
    id: z.ZodString;
}, z.core.$strip>;
