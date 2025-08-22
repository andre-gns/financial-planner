"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const clientRoutes_1 = require("./routes/clientRoutes");
const goalRoutes_1 = require("./routes/goalRoutes");
const app = (0, fastify_1.default)({
    logger: true,
}).withTypeProvider();
app.register(clientRoutes_1.clientRoutes, { prefix: "/api/clients" });
app.register(goalRoutes_1.goalRoutes, { prefix: "/api/goals" });
const start = async () => {
    try {
        await app.listen({ port: 3001 });
        console.log("Servidor rodando em http://localhost:3001");
    }
    catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};
start();
//# sourceMappingURL=server.js.map