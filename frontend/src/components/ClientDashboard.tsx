import { useEffect, useMemo, useState } from "react";
import axios from "axios";

type Client = {
  id: string;
  name: string;
  email: string;
  age: number;
  status: string;
  familyProfile?: string;
};

type Goal = {
  id: string;
  title: string;
  targetAmount: number;
  clientId: string;
};

type AllocationResponse = {
  clientId: string;
  groups: Array<{
    group: "Financeiras" | "Imobilizado";
    items: Array<{
      code: string;
      name: string;
      value: number;
      deltaPct?: number;
      color: string;
    }>;
  }>;
};

export default function ClientDashboard() {
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClientId, setSelectedClientId] = useState<string>("");
  const [goals, setGoals] = useState<Goal[]>([]);
  const [allocations, setAllocations] = useState<AllocationResponse | null>(
    null
  );

  useEffect(() => {
    axios
      .get<Client[]>("http://localhost:3001/clients")
      .then((res) => {
        setClients(res.data);
        if (res.data.length) setSelectedClientId(res.data[0].id);
      })
      .catch((err) => {
        console.error("Erro ao buscar clientes:", err);
      });
  }, []);

  useEffect(() => {
    axios
      .get<Goal[]>("http://localhost:3001/goals")
      .then((res) => setGoals(res.data))
      .catch((err) => console.error("Erro ao buscar metas:", err));
  }, []);

  const selectedClient = clients.find((c) => c.id === selectedClientId);
  const clientGoals = useMemo(
    () => goals.filter((g) => g.clientId === selectedClientId),
    [goals, selectedClientId]
  );

  // Buscar alocações sempre que o cliente selecionado mudar
  useEffect(() => {
    if (!selectedClientId) return;
    fetchAllocations();
  }, [selectedClientId]);

  function fetchAllocations() {
    axios
      .get<AllocationResponse>(
        `http://localhost:3001/allocations/${selectedClientId}`
      )
      .then((res) => setAllocations(res.data))
      .catch((err) => console.error("Erro ao buscar alocações:", err));
  }

  const totalAllocated = useMemo(() => {
    if (!allocations) return 0;
    return allocations.groups.reduce((sum, group) => {
      const groupSum = group.items.reduce(
        (acc, it) => acc + (it.value || 0),
        0
      );
      return sum + groupSum;
    }, 0);
  }, [allocations]);

  return (
    <div className="dashboard">
      <div className="dashboardContainer">
        <div className="dashboardHeader">
          <h1 className="dashboardTitle">Dashboard</h1>
          <button
            className="refreshButton"
            onClick={() => window.location.reload()}
          >
            Atualizar
          </button>
        </div>

        <div className="filterRow">
          <label className="filterLabel">Cliente:</label>
          <select
            className="select"
            value={selectedClientId}
            onChange={(e) => setSelectedClientId(e.target.value)}
          >
            {clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {selectedClient ? (
          <>
            <div className="card mb-6">
              <p className="kpiTitle">Total Alocado</p>
              <div className="headlineValue">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(totalAllocated)}
                <span className="headlineDelta">+12,37%</span>
              </div>
            </div>

            <div className="cardsGrid3Spaced">
              <div className="card">
                <p className="cardLabel">Nome</p>
                <p className="cardValue">{selectedClient.name}</p>
              </div>
              <div className="card">
                <p className="cardLabel">E-mail</p>
                <p className="cardValue font-normal">{selectedClient.email}</p>
              </div>
              <div className="card">
                <p className="cardLabel">Status</p>
                <p className="cardValue font-normal">{selectedClient.status}</p>
              </div>
            </div>

            <div className="cardsGrid3">
              <div className="card">
                <p className="cardLabel">Perfil</p>
                <p className="cardValue font-normal">Conservador</p>
              </div>
              <div className="card">
                <p className="cardLabel">Renda desejada/mês</p>
                <p className="cardValue font-normal">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(8200)}
                </p>
              </div>
              <div className="card">
                <p className="cardLabel">Aporte anual</p>
                <p className="cardValue font-normal">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(100000)}
                </p>
              </div>
            </div>

            <div className="section">
              <h2 className="sectionTitle">Metas do cliente</h2>
              {clientGoals.length ? (
                <div className="cardsGrid3">
                  {clientGoals.map((goal) => (
                    <div key={goal.id} className="card">
                      <p className="cardLabel">Meta</p>
                      <p className="cardValue font-normal">{goal.title}</p>
                      <p className="cardLabel mt-2">Objetivo</p>
                      <p className="cardValue font-normal">
                        {new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(goal.targetAmount)}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="muted">
                  Nenhuma meta encontrada para este cliente.
                </p>
              )}
            </div>

            <div className="section">
              <h2 className="sectionTitle">Perfil do cliente</h2>
              <div className="cardsGrid2">
                <div className="card">
                  <p className="cardLabel">Idade</p>
                  <p className="cardValue font-normal">
                    {selectedClient.age} anos
                  </p>
                </div>
                <div className="card">
                  <p className="cardLabel">Perfil Familiar</p>
                  <p className="cardValue font-normal">
                    {selectedClient.familyProfile ?? "—"}
                  </p>
                </div>
              </div>
            </div>

            <div className="section allocationCard">
              <div className="allocationHeader">
                <p className="allocationDate">Data da Alocação: 08/05/2025</p>
                <button className="refreshButton" onClick={fetchAllocations}>
                  Atualizar
                </button>
              </div>

              <div className="assetGroups">
                {allocations?.groups.map((group) => (
                  <div key={group.group}>
                    <div
                      className={`groupPill ${
                        group.group === "Imobilizado" ? "groupPill--imob" : ""
                      }`}
                    >
                      {group.group}
                    </div>
                    <div className="assetGrid">
                      {group.items.map((it) => (
                        <div
                          key={`${group.group}-${it.code}-${it.name}`}
                          className="assetCard assetCard--compact"
                        >
                          <div className="assetHeader">
                            <div
                              className="assetIcon"
                              style={{ background: it.color }}
                            >
                              {it.code}
                            </div>
                            <div>
                              <p className="assetName assetName--small">
                                {it.name}
                              </p>
                              <p className="assetValue assetValue--tight">
                                {new Intl.NumberFormat("pt-BR", {
                                  style: "currency",
                                  currency: "BRL",
                                }).format(it.value)}
                              </p>
                              {typeof it.deltaPct === "number" && (
                                <p
                                  className={`assetDelta assetDelta--tiny ${
                                    it.deltaPct >= 0
                                      ? "deltaPositive"
                                      : "deltaNegative"
                                  }`}
                                >
                                  {it.deltaPct >= 0 ? "+" : ""}
                                  {it.deltaPct.toFixed(2)}%
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="section indicatorGrid">
              <div className="indicatorItem">
                <p className="cardLabel">Aposentadoria</p>
                <div className="progressTrack">
                  <div className="progressBar" style={{ width: "63%" }} />
                </div>
                <p className="muted mt-2">63 anos</p>
              </div>
              <div className="indicatorItem">
                <p className="cardLabel">Renda desejada/mês</p>
                <p className="cardValue font-normal">
                  R$ {(8200).toLocaleString("pt-BR")}
                </p>
              </div>
              <div className="indicatorItem">
                <p className="cardLabel">Target rendimento</p>
                <p className="cardValue font-normal">IPCA + 3,2%</p>
              </div>
            </div>

            <div className="chartsGrid">
              <div className="chartCard">
                <p className="cardLabel">Comparação de Alocações</p>
                <div className="progressTrack mt-3">
                  <div className="progressBar" style={{ width: "18%" }} />
                </div>
                <p className="muted mt-2">18%</p>
              </div>
              <div className="chartCard">
                <p className="cardLabel">Patrimônio - Visão geral</p>
                <div className="progressTrack mt-3">
                  <div className="progressBar" style={{ width: "70%" }} />
                </div>
                <p className="muted mt-2">70% meta do ano</p>
              </div>
              <div className="chartCard">
                <p className="cardLabel">KPI Liquidez carteira</p>
                <div className="barChart">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={i}
                      className="bar"
                      style={{ height: `${30 + (i % 4) * 15}px` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <p className="muted">Nenhum cliente selecionado.</p>
        )}
      </div>
    </div>
  );
}
