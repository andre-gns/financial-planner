import { PrismaClient } from "@prisma/client";

// Cria uma única instância do Prisma Client, garantindo que ele não seja recriado
// a cada hot-reload do ts-node-dev
const prisma = new PrismaClient();

// Garante que o Prisma Client esteja disponível globalmente durante o desenvolvimento
declare global {
  var prisma: PrismaClient | undefined;
}

if (process.env.NODE_ENV === "production") {
  module.exports = prisma;
} else {
  if (!global.prisma) {
    global.prisma = prisma;
  }
  module.exports = global.prisma;
}
