// src/utils/inMemoryDatabase.ts
import { randomUUID } from "crypto";

interface IClient {
  id: string;
  name: string;
  email: string;
  age: number;
  status: "active" | "inactive";
  familyProfile?: string;
}

interface IGoal {
  id: string;
  title: string;
  description?: string;
  targetAmount: number;
  clientId: string;
  deadline?: string;
}

const goals: IGoal[] = [];
const clients: IClient[] = [];

// Funções para manipular "goals"
export const goalsDb = {
  create: (data: Omit<IGoal, "id">): IGoal => {
    const newGoal = { id: randomUUID(), ...data };
    goals.push(newGoal);
    return newGoal;
  },
  findMany: (): IGoal[] => goals,
  findUnique: (id: string): IGoal | undefined =>
    goals.find((goal) => goal.id === id),
  update: (id: string, data: Partial<Omit<IGoal, "id">>): IGoal | undefined => {
    const index = goals.findIndex((goal) => goal.id === id);
    if (index > -1) {
      goals[index] = { ...goals[index], ...data };
      return goals[index];
    }
    return undefined;
  },
  delete: (id: string): void => {
    const index = goals.findIndex((goal) => goal.id === id);
    if (index > -1) {
      goals.splice(index, 1);
    }
  },
};

// Funções para manipular "clients"
export const clientsDb = {
  create: (data: Omit<IClient, "id">): IClient => {
    const newClient = { id: randomUUID(), ...data };
    clients.push(newClient);
    return newClient;
  },
  findMany: (): IClient[] => clients,
  findUnique: (id: string): IClient | undefined =>
    clients.find((client) => client.id === id),
  update: (
    id: string,
    data: Partial<Omit<IClient, "id">>
  ): IClient | undefined => {
    const index = clients.findIndex((client) => client.id === id);
    if (index > -1) {
      clients[index] = { ...clients[index], ...data };
      return clients[index];
    }
    return undefined;
  },
  delete: (id: string): void => {
    const index = clients.findIndex((client) => client.id === id);
    if (index > -1) {
      clients.splice(index, 1);
    }
  },
};
