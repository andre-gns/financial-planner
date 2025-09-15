import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useClientSelection } from "../clientContext";

type Client = { id: string; name: string };

export default function ProjectionPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const { selectedClientId: clientId, setSelectedClientId: setClientId } =
    useClientSelection();
  const [isClientMenuOpen, setIsClientMenuOpen] = useState(false);
  const [clientQuery, setClientQuery] = useState("");

  useEffect(() => {
    axios
      .get<Client[]>("http://localhost:3001/clients")
      .then((r) => {
        setClients(r.data);
        if (r.data.length) setClientId(r.data[0].id);
      })
      .catch(() => {});
  }, []);

  const selectedClient = useMemo(
    () => clients.find((c) => c.id === clientId),
    [clients, clientId]
  );

  return (
    <div className="projectionContainer">
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
                    const active = clientId === c.id;
                    return (
                      <button
                        key={c.id}
                        className={`selectorItem ${
                          active ? "selectorItemActive" : ""
                        }`}
                        onClick={() => {
                          setClientId(c.id);
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

      <div className="kpiRow">
        <div className="metricBlock">
          <div className="muted text-[11px]">Patrimônio Líquido Total</div>
          <div className="metricValue">
            R$ 2.679.930,00<span className="headlineDelta ml-2">+2,37%</span>
          </div>
        </div>
        <div className="kpiCard">
          <div className="kpiLabel">R$ 2.679.930,00</div>
          <div className="kpiBar">
            <div style={{ width: "52%" }} />
          </div>
        </div>
        <div className="kpiCard">
          <div className="kpiLabel">
            R$ 3.173.960,00 <span className="headlineDelta">+18,37%</span>
          </div>
          <div className="kpiBar kpiBar--blue">
            <div style={{ width: "64%" }} />
          </div>
        </div>
        <div className="kpiCard">
          <div className="kpiLabel">R$ 2.173.960,00</div>
          <div className="kpiBar kpiBar--violet">
            <div style={{ width: "42%" }} />
          </div>
        </div>
      </div>

      <div className="bigChartCard">
        <div className="chartHeader">
          <span className="chartTitle">Projeção Patrimonial</span>
          <div className="chartActions">
            <button className="chartAction">Ver com detalhes</button>
            <button className="chartAction">Ver como Tabela</button>
          </div>
        </div>
        <div className="bigChartArea">
          <svg viewBox="0 0 720 260" className="chartSvg" aria-hidden>
            {Array.from({ length: 6 }).map((_, i) => (
              <line
                key={i}
                x1="40"
                y1={30 + i * 38}
                x2="700"
                y2={30 + i * 38}
                stroke="#2a2a2a"
                strokeWidth="1"
              />
            ))}
            <path
              d="M40,210 C160,150 240,100 360,90 C480,82 560,98 700,80"
              stroke="#60a5fa"
              strokeWidth="3"
              fill="none"
              strokeDasharray="8 8"
              opacity="0.9"
            />
            <path
              d="M40,210 C150,170 230,130 340,120 C460,112 530,150 700,200"
              stroke="#22c55e"
              strokeWidth="3"
              fill="none"
              strokeDasharray="8 8"
              opacity="0.9"
            />
            <path
              d="M40,210 L120,190 L180,160 L240,150"
              stroke="#fbbf24"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      <div className="chipRow chipRow--center">
        <button className="chip chip--hollow">Plano Original</button>
        <button className="chip">Situação atual 05/2025</button>
        <button className="chip chip--gold">Realizado</button>
      </div>

      <div className="timelineCard">
        <div className="timelineHeader">Timeline</div>
        <svg viewBox="0 0 720 180" className="timelineSvg" aria-hidden>
          {(() => {
            const startYear = 2025;
            const endYear = 2060;
            const X0 = 40;
            const X1 = 700;
            const Y_GREEN = 58; // linha superior (verde)
            const Y_RED = 128; // linha inferior (vermelha)
            const YEAR_Y = Math.round((Y_GREEN + Y_RED) / 2) + 6;
            const AGE_Y = YEAR_Y + 16;
            const scale = (year: number) => {
              const t = (year - startYear) / (endYear - startYear);
              return X0 + t * (X1 - X0);
            };
            const years: number[] = [];
            for (let y = startYear; y <= endYear; y += 10) years.push(y);

            const salaryPoints = [
              { year: 2025, label: "CLT: R$ 15.000" },
              { year: 2030, label: "CLT: R$ 16.000\nAutônomo: R$ 5.000" },
              { year: 2035, label: "Autônomo: R$ 35.000" },
              { year: 2045, label: "" },
            ];
            const costPoints = [
              { year: 2025, label: "R$ 8.000" },
              { year: 2032, label: "R$ 12.000" },
              { year: 2040, label: "R$ 20.000" },
              { year: 2045, label: "R$ 10.000" },
              { year: 2055, label: "R$ 15.000" },
            ];

            return (
              <g>
                {/* titles */}
                <text
                  x={X0}
                  y={Y_GREEN - 20}
                  className="tlTitle tlTitle--green"
                >
                  Salário
                </text>
                <text x={X0} y={Y_RED - 20} className="tlTitle tlTitle--red">
                  Custo de vida
                </text>

                {/* dashed baselines & ticks */}
                <line
                  x1={X0}
                  y1={Y_GREEN}
                  x2={X1}
                  y2={Y_GREEN}
                  className="tlAxisDashed"
                />
                <line
                  x1={X0}
                  y1={Y_RED}
                  x2={X1}
                  y2={Y_RED}
                  className="tlAxisDashed"
                />
                {Array.from({ length: Math.floor((X1 - X0) / 20) + 1 }).map(
                  (_, i) => (
                    <g key={`mt-${i}`}>
                      <line
                        x1={X0 + i * 20}
                        y1={Y_GREEN}
                        x2={X0 + i * 20}
                        y2={Y_GREEN + 2}
                        className="tlMinorTick"
                      />
                      <line
                        x1={X0 + i * 20}
                        y1={Y_RED - 2}
                        x2={X0 + i * 20}
                        y2={Y_RED}
                        className="tlMinorTick"
                      />
                    </g>
                  )
                )}
                {Array.from({ length: Math.floor((X1 - X0) / 100) + 1 }).map(
                  (_, i) => (
                    <g key={`maj-${i}`}>
                      <line
                        x1={X0 + i * 100}
                        y1={Y_GREEN}
                        x2={X0 + i * 100}
                        y2={Y_GREEN + 6}
                        className="tlMajorTick"
                      />
                      <line
                        x1={X0 + i * 100}
                        y1={Y_RED - 6}
                        x2={X0 + i * 100}
                        y2={Y_RED}
                        className="tlMajorTick"
                      />
                    </g>
                  )
                )}

                {/* center legends */}
                <text x={X0 - 24} y={YEAR_Y - 2} className="tlLegend">
                  Ano
                </text>
                <text x={X0 - 28} y={AGE_Y - 2} className="tlLegend">
                  Idade
                </text>
                {years.map((yy) => (
                  <g key={`yy-${yy}`}>
                    <text
                      x={scale(yy)}
                      y={YEAR_Y}
                      className="tlYear"
                      textAnchor="middle"
                    >
                      {yy}
                    </text>
                    <text
                      x={scale(yy)}
                      y={AGE_Y}
                      className="tlAge"
                      textAnchor="middle"
                    >
                      {45 + (yy - startYear)}
                    </text>
                  </g>
                ))}

                {/* labeled points */}
                {salaryPoints.map((p, i) => (
                  <g key={`sp-${i}`}>
                    <circle
                      cx={scale(p.year)}
                      cy={Y_GREEN}
                      r={4}
                      className="tlDot tlDot--green"
                    />
                    {p.label && (
                      <text
                        x={scale(p.year)}
                        y={Y_GREEN - (28 + (i % 2) * 10)}
                        className="tlBubble tlBubble--green"
                        textAnchor="middle"
                      >
                        {p.label.split("\n").map((line, j) => (
                          <tspan
                            key={j}
                            x={scale(p.year)}
                            dy={j === 0 ? 0 : 12}
                          >
                            {line}
                          </tspan>
                        ))}
                      </text>
                    )}
                  </g>
                ))}
                {costPoints.map((p, i) => (
                  <g key={`cp-${i}`}>
                    <circle
                      cx={scale(p.year)}
                      cy={Y_RED}
                      r={4}
                      className="tlDot tlDot--red"
                    />
                    <text
                      x={scale(p.year)}
                      y={Y_RED + (28 + (i % 2) * 10)}
                      className="tlBubble tlBubble--red"
                      textAnchor="middle"
                    >
                      {p.label.split("\n").map((line, j) => (
                        <tspan key={j} x={scale(p.year)} dy={j === 0 ? 0 : 12}>
                          {line}
                        </tspan>
                      ))}
                    </text>
                  </g>
                ))}
              </g>
            );
          })()}
        </svg>
      </div>

      <div className="movementSection">
        <div className="movementFilters justify-end">
          <span className="pill pill--light">Financeiras</span>
          <span className="pill">Imobilizadas</span>
        </div>

        <div className="movementGrid">
          <div className="movementCard movementCard--ok">
            <div>
              <div className="movementTitle">Venda de automóvel</div>
              <div className="movementMeta">09/07/23 - 22/07/23</div>
              <div className="movementMeta">Frequência: Única</div>
              <div className="movementMeta">Crédito</div>
            </div>
            <div className="movementValue up">R$ 220.000</div>
          </div>

          <div className="movementCard movementCard--down">
            <div>
              <div className="movementTitle">Custo do filho</div>
              <div className="movementMeta">09/07/23 - 22/07/43</div>
              <div className="movementMeta">Frequência: Mensal</div>
              <div className="movementMeta">Dependente</div>
            </div>
            <div className="movementValue down">R$ 1.500</div>
          </div>

          <div className="movementCard movementCard--ok">
            <div>
              <div className="movementTitle">Comissão</div>
              <div className="movementMeta">09/07/23 - 22/07/23</div>
              <div className="movementMeta">Frequência: Anual</div>
              <div className="movementMeta">Crédito</div>
            </div>
            <div className="movementValue up">R$ 500.000</div>
          </div>

          <div className="movementCard movementCard--down">
            <div>
              <div className="movementTitle">Compra de Imóvel</div>
              <div className="movementMeta">09/07/23 - 22/07/23</div>
              <div className="movementMeta">Frequência: Única</div>
              <div className="movementMeta">Imobilizado</div>
            </div>
            <div className="movementValue down">R$ 1.500.000</div>
          </div>
        </div>
      </div>

      <div className="insuranceGrid">
        <div className="insuranceCard">
          <div className="insuranceTitle">Seguro de Vida Familiar</div>
          <div className="insuranceMeta">
            Seguro de Vida • Duração: 18 anos • Prêmio: R$ 120/mês
          </div>
          <div className="insuranceValue">R$ 500.000</div>
        </div>
        <div className="insuranceCard">
          <div className="insuranceTitle">Seguro de Invalidez</div>
          <div className="insuranceMeta">
            Seguro de Invalidez • Duração: 5 anos • Prêmio: R$ 300/mês
          </div>
          <div className="insuranceValue">R$ 100.000</div>
        </div>
      </div>
    </div>
  );
}
