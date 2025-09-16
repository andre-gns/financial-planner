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
    <div className="dashboard bg-black min-h-screen">
      <div className="dashboardContainer bg-black">
        <div className="dashboardHeader">
          <h1 className="dashboardTitle">Dashboard</h1>
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
            <div className="card mb-6 bg-transparent border border-gray-700 p-3">
              <p className="kpiTitle text-sm">Total Alocado</p>
              <div className="headlineValue text-xl">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(totalAllocated)}
                <span className="headlineDelta text-sm">+12,37%</span>
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
                <div className="liquidityChart">
                  <svg
                    viewBox="0 0 400 350"
                    className="liquidityChartSvg"
                    aria-hidden
                  >
                    {/* Grid lines */}
                    {Array.from({ length: 5 }).map((_, i) => (
                      <line
                        key={i}
                        x1="40"
                        y1={60 + i * 60}
                        x2="380"
                        y2={60 + i * 60}
                        stroke="#2a2a2a"
                        strokeWidth="1"
                        className="liquidityGridLine"
                      />
                    ))}

                    {/* Y-axis labels */}
                    <text x="20" y="65" className="liquidityYLabel">
                      500K
                    </text>
                    <text x="20" y="125" className="liquidityYLabel">
                      250K
                    </text>
                    <text x="20" y="185" className="liquidityYLabel">
                      100K
                    </text>
                    <text x="20" y="245" className="liquidityYLabel">
                      50K
                    </text>

                    {/* Bars */}
                    {[
                      { year: 0, value: 110 },
                      { year: 1, value: 20 },
                      { year: 2, value: 70 },
                      { year: 3, value: 230 },
                      { year: 4, value: 100 },
                      { year: 5, value: 30 },
                      { year: 6, value: 350 },
                      { year: 7, value: 45 },
                      { year: 8, value: 200 },
                      { year: 9, value: 300 },
                    ].map((bar, i) => {
                      const barHeight = (bar.value / 500) * 280; // Scale to max 500K - barras mais altas
                      const barWidth = 24; // Largura menor (era 30)
                      const barX = 50 + i * 35;
                      const barY = 320 - barHeight;

                      return (
                        <g key={i}>
                          <rect
                            x={barX}
                            y={barY}
                            width={barWidth}
                            height={barHeight}
                            fill="#00d4aa"
                            className="liquidityBar"
                          />
                          <text
                            x={barX + barWidth / 2}
                            y="335"
                            className="liquidityXLabel"
                            textAnchor="middle"
                          >
                            {bar.year}
                          </text>
                        </g>
                      );
                    })}

                    {/* Legend */}
                    <g className="liquidityLegend">
                      <circle
                        cx="320"
                        cy="50"
                        r="4"
                        fill="#3b82f6"
                        className="liquidityLegendDot"
                      />
                      <text x="335" y="55" className="liquidityLegendText">
                        Esperade
                      </text>
                      <circle
                        cx="320"
                        cy="70"
                        r="4"
                        fill="#8b5cf6"
                        className="liquidityLegendDot"
                      />
                      <text x="335" y="75" className="liquidityLegendText">
                        Emergencia
                      </text>
                    </g>
                  </svg>
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
