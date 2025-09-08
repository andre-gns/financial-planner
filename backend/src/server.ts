import express from "express";
import cors from "cors";

const app = express();

const port = 3001;

app.use(cors());

app.use(express.json());

const clients = [
  {
    id: "1",
    name: "João Silva",
    email: "joao.silva@email.com",
    age: 35,
    status: "Ativo",
    familyProfile: "Família com filhos",
  },
  {
    id: "2",
    name: "Maria Souza",
    email: "maria.souza@email.com",
    age: 28,
    status: "Inativo",
    familyProfile: "Solteiro(a)",
  },
  {
    id: "3",
    name: "Carlos Santos",
    email: "carlos.santos@email.com",
    age: 45,
    status: "Ativo",
    familyProfile: "Com dependentes",
  },
  {
    id: "4",
    name: "Ana Costa",
    email: "ana.costa@email.com",
    age: 50,
    status: "Ativo",
    familyProfile: "Sem dependentes",
  },
  {
    id: "5",
    name: "Pedro Alves",
    email: "pedro.alves@email.com",
    age: 22,
    status: "Ativo",
    familyProfile: "Solteiro(a)",
  },
];

app.get("/clients", (req, res) => {
  console.log("Requisição recebida para a rota /clients");
  res.json(clients);
});

const goals = [
  { id: "g1", title: "Aposentadoria", targetAmount: 1000000, clientId: "1" },
  {
    id: "g2",
    title: "Viagem internacional",
    targetAmount: 30000,
    clientId: "1",
  },
  {
    id: "g3",
    title: "Reserva de emergência",
    targetAmount: 50000,
    clientId: "2",
  },
  { id: "g4", title: "Estudos filhos", targetAmount: 80000, clientId: "3" },
  { id: "g5", title: "Casa própria", targetAmount: 400000, clientId: "4" },
  { id: "g6", title: "Abrir negócio", targetAmount: 120000, clientId: "5" },
];

app.get("/goals", (req, res) => {
  console.log("Requisição recebida para a rota /goals");
  res.json(goals);
});

type AllocationGroup = {
  group: "Financeiras" | "Imobilizado";
  items: Array<{
    code: string;
    name: string;
    value: number;
    deltaPct?: number;
    color: string;
  }>;
};

const allocationsByClient: Record<string, AllocationGroup[]> = {
  "1": [
    {
      group: "Financeiras",
      items: [
        {
          code: "FI",
          name: "Fundo DI",
          value: 79930,
          deltaPct: 46.67,
          color: "#f59e0b",
        },
        {
          code: "FX",
          name: "Fundo XXX",
          value: 359930,
          deltaPct: 23.69,
          color: "#fb923c",
        },
        {
          code: "BTC",
          name: "BTC",
          value: 212879,
          deltaPct: 70.12,
          color: "#f59e0b",
        },
      ],
    },
    {
      group: "Imobilizado",
      items: [
        { code: "CP", name: "Casa de Praia", value: 2500000, color: "#8b5cf6" },
        {
          code: "AP",
          name: "Apartamento SP",
          value: 1200000,
          color: "#7c3aed",
        },
      ],
    },
  ],
  "2": [
    {
      group: "Financeiras",
      items: [
        {
          code: "FI",
          name: "Fundo DI",
          value: 50310,
          deltaPct: 10.12,
          color: "#f59e0b",
        },
        {
          code: "FX",
          name: "Fundo XYZ",
          value: 180000,
          deltaPct: -2.3,
          color: "#fb923c",
        },
      ],
    },
    { group: "Imobilizado", items: [] },
  ],
};

// Util para gerar itens aleatórios mantendo consistência visual
function randomAllocations(base: AllocationGroup[]): AllocationGroup[] {
  return base.map((group) => {
    const extraCount = Math.floor(Math.random() * 2); // 0-1 itens extras
    const extraItems = Array.from({ length: extraCount }).map((_, i) => {
      const value = Math.floor(1000 + Math.random() * 50000);
      const delta =
        Math.random() > 0.3
          ? +(Math.random() * 30).toFixed(2)
          : -+(Math.random() * 10).toFixed(2);
      const code = ["FI", "FX", "BD", "ETF"][Math.floor(Math.random() * 4)];
      const palette = [
        "#f59e0b",
        "#fb923c",
        "#22c55e",
        "#3b82f6",
        "#8b5cf6",
        "#7c3aed",
      ]; // tons coerentes
      const color = palette[Math.floor(Math.random() * palette.length)];
      return {
        code,
        name: `${code} Extra ${i + 1}`,
        value,
        deltaPct: delta,
        color,
      };
    });
    return { ...group, items: [...group.items, ...extraItems] };
  });
}

app.get("/allocations/:clientId", (req, res) => {
  const { clientId } = req.params as { clientId: string };
  const base = allocationsByClient[clientId] ?? [];
  const withRandom = randomAllocations(base);
  res.json({ clientId, groups: withRandom });
});

app.listen(port, () => {
  console.log(`Backend rodando em http://localhost:${port}`);
  console.log(
    "O servidor de backend está pronto para receber requisições do seu frontend."
  );
});
