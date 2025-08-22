"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.goalRoutes = goalRoutes;
// Importe os novos handlers
const goalController_1 = require("../controllers/goalController");
async function goalRoutes(fastify) {
    const server = fastify.withTypeProvider();
    // Rota para criar uma nova meta
    server.post("/", goalController_1.createGoalHandler);
    // Rota para listar todas as metas
    server.get("/", goalController_1.getGoalsHandler);
    // Rota para buscar uma meta por ID
    server.get("/:id", goalController_1.getGoalHandler);
    // Rota para atualizar uma meta
    server.put("/:id", goalController_1.updateGoalHandler);
    // Rota para deletar uma meta
    server.delete("/:id", goalController_1.deleteGoalHandler);
}
//# sourceMappingURL=goalRoutes.js.map