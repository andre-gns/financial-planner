import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { createClientSchema, updateClientSchema, clientParamsSchema } from "../schemas/schemas";
type CreateClientInput = z.infer<typeof createClientSchema>;
type UpdateClientInput = z.infer<typeof updateClientSchema>;
type ClientParamsInput = z.infer<typeof clientParamsSchema>;
export declare function createClientHandler(request: FastifyRequest<{
    Body: CreateClientInput;
}>, reply: FastifyReply): Promise<never>;
export declare function getClientsHandler(request: FastifyRequest, reply: FastifyReply): Promise<never>;
export declare function getClientHandler(request: FastifyRequest<{
    Params: ClientParamsInput;
}>, reply: FastifyReply): Promise<never>;
export declare function updateClientHandler(request: FastifyRequest<{
    Params: ClientParamsInput;
    Body: UpdateClientInput;
}>, reply: FastifyReply): Promise<never>;
export declare function deleteClientHandler(request: FastifyRequest<{
    Params: ClientParamsInput;
}>, reply: FastifyReply): Promise<never>;
export {};
