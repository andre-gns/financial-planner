import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useClientSelection } from "../clientContext";

type SimulationRow = {
  date: string;
  finalWealth: string;
  retirementAge: string;
  version: string;
};

type Client = { id: string; name: string };

function buildRowsForClient(clientName: string): SimulationRow[] {
  const seed = clientName.length * 173;
  const wealth1 = 3000000 + (seed % 1500000);
  const wealth2 = Math.max(wealth1 - 520000, Math.floor(wealth1 * 0.73));
  const fmt = (v: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(v);
  return [
    {
      date: "01/02/25",
      finalWealth: fmt(wealth1),
      retirementAge: "68",
      version: "1",
    },
    {
      date: "04/05/25",
      finalWealth: fmt(wealth2),
      retirementAge: "68",
      version: "2",
    },
  ];
}

export default function HistoryPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const { selectedClientId, setSelectedClientId } = useClientSelection();
  const [isChartOpen, setIsChartOpen] = useState(false);
  const [isClientMenuOpen, setIsClientMenuOpen] = useState(false);
  const [clientQuery, setClientQuery] = useState("");

  useEffect(() => {
    axios
      .get<Client[]>("http://localhost:3001/clients")
      .then((res) => {
        setClients(res.data);
        if (res.data.length) setSelectedClientId(res.data[0].id);
      })
      .catch((err) => console.error("Erro ao buscar clientes:", err));
  }, []);

  const selectedClient = clients.find((c) => c.id === selectedClientId);
  const rows = useMemo(
    () => buildRowsForClient(selectedClient?.name || ""),
    [selectedClient?.name]
  );

  return (
    <div className="historyContainer">
      <div className="historyTopBar relative">
        <div className="selectorWrap">
          <button
            className="clientSelector"
            aria-label="Selecionar cliente"
            onClick={() => setIsClientMenuOpen((v) => !v)}
          >
            <span className="clientName">
              {selectedClient?.name || "Selecionar"}
            </span>
            <svg
              className="w-4 h-4 text-gray-300"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden
              style={{
                transform: isClientMenuOpen ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 120ms ease",
              }}
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>

          {isClientMenuOpen && (
            <>
              <div
                className="menuOverlay"
                onClick={() => setIsClientMenuOpen(false)}
              />
              <div
                className="selectorMenu"
                role="listbox"
                aria-label="Clientes"
              >
                <div className="selectorSearchWrap">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden
                  >
                    <circle cx="11" cy="11" r="7" />
                    <path d="M21 21l-4.3-4.3" />
                  </svg>
                  <input
                    className="selectorSearch"
                    placeholder="Buscar cliente..."
                    value={clientQuery}
                    onChange={(e) => setClientQuery(e.target.value)}
                    autoFocus
                  />
                </div>
                {clients
                  .filter((c) =>
                    c.name.toLowerCase().includes(clientQuery.toLowerCase())
                  )
                  .map((c) => {
                    const initials = c.name
                      .split(" ")
                      .slice(0, 2)
                      .map((p) => p[0]?.toUpperCase())
                      .join("");
                    const active = selectedClientId === c.id;
                    return (
                      <button
                        key={c.id}
                        className={`selectorItem ${
                          active ? "selectorItemActive" : ""
                        }`}
                        onClick={() => {
                          setSelectedClientId(c.id);
                          setIsClientMenuOpen(false);
                        }}
                        role="option"
                        aria-selected={active}
                      >
                        <span className="selectorAvatar">{initials}</span>
                        <span className="flex-1 text-left">{c.name}</span>
                        {active && (
                          <svg
                            className="w-4 h-4 text-blue-400"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            aria-hidden
                          >
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                        )}
                      </button>
                    );
                  })}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="historyHeader">
        <h1 className="historyTitle">Histórico de simulações</h1>
        <button className="iconDots" aria-label="Mais opções">
          <span />
          <span />
          <span />
        </button>
      </div>
      <div className="historyDivider" />

      <div className="space-y-4">
        {/* Plano original card */}
        <div className="historyItem">
          <div className="historyItemHeader">
            <div className="historyBadge historyBadge--blue" aria-hidden>
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M3 3v18h18" />
                <path d="M6 15l4-4 3 3 5-7" />
              </svg>
            </div>
            <span className="historyItemTitle">Plano original</span>
          </div>

          <div className="historyTable">
            <div className="historyTh">Data</div>
            <div className="historyTh">Patrimônio final</div>
            <div className="historyTh">Data de Aposentadoria</div>
            <div className="historyTh">Versão</div>
            <div />

            {rows.map((r, idx) => (
              <React.Fragment key={idx}>
                <div className="historyTd">{r.date}</div>
                <div className="historyTd">{r.finalWealth}</div>
                <div className="historyTd">{r.retirementAge}</div>
                <div className="historyTd">{r.version}</div>
                <div className="historyTd text-right">
                  <button
                    className="seeChartBtn"
                    onClick={() => setIsChartOpen(true)}
                  >
                    Ver no gráfico
                  </button>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Adiantar aposentadoria 3 anos */}
        <div className="historyItem">
          <div className="historyItemHeader">
            <div className="historyBadge historyBadge--yellow" aria-hidden>
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="9" />
              </svg>
            </div>
            <span className="historyItemTitle">
              Adiantar aposentadoria 3 anos
            </span>
          </div>
          <div className="historyRowSolo">
            <button
              className="seeChartBtn"
              onClick={() => setIsChartOpen(true)}
            >
              Ver no gráfico
            </button>
          </div>
        </div>

        {/* Aposentadoria na praia */}
        <div className="historyItem">
          <div className="historyItemHeader">
            <div className="historyBadge historyBadge--gray" aria-hidden>
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M3 12h18" />
              </svg>
            </div>
            <span className="historyItemTitle">Aposentadoria na praia</span>
          </div>
          <div className="historyRowSolo">
            <button
              className="seeChartBtn"
              onClick={() => setIsChartOpen(true)}
            >
              Ver no gráfico
            </button>
          </div>
        </div>
      </div>

      <div className="historyFooter">
        <button className="pagerCircle" aria-label="Anterior">
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <span className="historyPageInfo">Página 1 de 10</span>
        <button className="pagerCircle" aria-label="Próxima">
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
      </div>

      {isChartOpen && (
        <div className="modalOverlay" onClick={() => setIsChartOpen(false)}>
          <div
            className="modalContent"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Projeção Patrimonial"
          >
            <div className="chartHeader">
              <span className="chartTitle">Projeção Patrimonial</span>
              <div className="chartActions">
                <button className="chartAction">Ver com detalhes</button>
                <button className="chartAction">Ver como Tabela</button>
              </div>
            </div>
            <div className="chartArea">
              <svg viewBox="0 0 640 260" className="chartSvg" aria-hidden>
                <defs>
                  <linearGradient
                    id="lineGrad"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#fbbf24" />
                    <stop offset="100%" stopColor="#fde68a" />
                  </linearGradient>
                </defs>
                {/* grid lines */}
                {Array.from({ length: 6 }).map((_, i) => (
                  <line
                    key={`g-${i}`}
                    x1="40"
                    y1={30 + i * 38}
                    x2="620"
                    y2={30 + i * 38}
                    stroke="#2a2a2a"
                    strokeWidth="1"
                  />
                ))}
                {/* axes */}
                <rect
                  x="32"
                  y="22"
                  width="596"
                  height="216"
                  rx="10"
                  ry="10"
                  fill="none"
                />
                {/* dashed projections */}
                <path
                  d="M40,210 C160,150 240,100 360,90 C480,82 560,98 620,80"
                  stroke="#60a5fa"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray="8 8"
                  opacity="0.9"
                />
                <path
                  d="M40,210 C150,170 230,130 340,120 C460,112 530,150 620,200"
                  stroke="#22c55e"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray="8 8"
                  opacity="0.9"
                />
                {/* actual line */}
                <path
                  d="M40,210 L120,190 L180,160 L240,150"
                  stroke="url(#lineGrad)"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                />
                {/* points */}
                {[
                  { x: 40, y: 210 },
                  { x: 120, y: 190 },
                  { x: 180, y: 160 },
                  { x: 240, y: 150 },
                ].map((p, i) => (
                  <circle
                    key={`p-${i}`}
                    cx={p.x}
                    cy={p.y}
                    r="4"
                    fill="#fbbf24"
                  />
                ))}
              </svg>
              <div className="chartSide">
                <div className="sideStat">
                  <span className="sideLabel">Cliente</span>
                  <span className="sideValue">
                    {selectedClient?.name || "—"}
                  </span>
                </div>
                <div className="sideStat">
                  <span className="sideLabel">Horizonte</span>
                  <span className="sideValue">25 anos</span>
                </div>
                <div className="sideStat">
                  <span className="sideLabel">Meta</span>
                  <span className="sideValue">IPCA + 3,2%</span>
                </div>
                <div className="legend">
                  <div className="legendItem">
                    <span className="legendDot legendDot--gold" /> Realizado
                  </div>
                  <div className="legendItem">
                    <span className="legendDot legendDot--blue" /> Projeção
                    otimista
                  </div>
                  <div className="legendItem">
                    <span className="legendDot legendDot--green" /> Projeção
                    conservadora
                  </div>
                </div>
              </div>
            </div>
            <div className="chartFooter">
              <div className="footerStat">
                <span className="footerLabel">Patrimônio pico</span>
                <span className="footerValue">R$ 8,3M</span>
              </div>
              <div className="footerStat">
                <span className="footerLabel">Idade de aposentadoria</span>
                <span className="footerValue">68</span>
              </div>
              <div className="footerStat">
                <span className="footerLabel">Probabilidade</span>
                <span className="footerValue">74%</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
