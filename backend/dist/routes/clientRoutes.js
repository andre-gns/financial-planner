"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientRoutes = clientRoutes;
const clientController_1 = require("../controllers/clientController");
async function clientRoutes(fastify) {
    const server = fastify.withTypeProvider();
    server.post("/", clientController_1.createClientHandler);
    server.get("/", clientController_1.getClientsHandler);
    server.get("/:id", clientController_1.getClientHandler);
    server.put("/:id", clientController_1.updateClientHandler);
    server.delete("/:id", clientController_1.deleteClientHandler);
}
//# sourceMappingURL=clientRoutes.js.map