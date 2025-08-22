"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = require("@prisma/client");
// Cria uma instância do Prisma Client
exports.prisma = new client_1.PrismaClient();
if (process.env.NODE_ENV === "production") {
    module.exports = exports.prisma;
}
else {
    if (!global.prisma) {
        global.prisma = exports.prisma;
    }
    module.exports = global.prisma;
}
//# sourceMappingURL=prisma.js.map