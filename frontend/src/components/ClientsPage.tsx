import React, { useMemo } from "react";

type ClientRow = {
  id: string;
  name: string;
  wealth: number;
  monthsDelta: number; // positivo ou negativo
  avatarUrl?: string;
};

const MOCK_ROWS: ClientRow[] = [
  { id: "1", name: "Matheus Lima", wealth: 45678910, monthsDelta: +6 },
  { id: "2", name: "Emerson da Rocha", wealth: 12345678, monthsDelta: +6 },
  { id: "3", name: "Gisele Bulhões", wealth: 89012345, monthsDelta: +3 },
  { id: "4", name: "Carmen Ferreira", wealth: 56789012, monthsDelta: -3 },
];

export default function ClientsPage() {
  const formatBRL = (v: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(v);

  const gauge = useMemo(() => {
    // percent atual e variação vs período anterior (mock)
    const percent = 75;
    const previousPercent = 69; // substitua quando houver dados reais
    const trend = percent - previousPercent; // positivo: subindo, negativo: caindo
    return {
      percent,
      label: "219 clientes",
      trend,
    };
  }, []);

  return (
    <div className="dashboardContainer clientsGrid">
      <div className="clientsLeft">
        <div className="clientsCard">
          <p className="clientsCardTitle">Alinhamento com planejamento</p>
          <div className="stackBars">
            {[
              { l: "Superior a 90%", c: "#22c55e", p: 14 },
              { l: "90% a 70%", c: "#eab308", p: 20 },
              { l: "70% a 50%", c: "#f97316", p: 45 },
              { l: "Inferior a 50%", c: "#ef4444", p: 21 },
            ].map((r) => (
              <div className="stackRow" key={r.l}>
                <span className="stackLabel">{r.l}</span>
                <div className="stackTrack">
                  <div
                    className="stackFill"
                    style={{ width: `${r.p}%`, background: r.c }}
                  />
                </div>
                <span className="stackLabel" style={{ width: 32 }}>
                  {r.p}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="clientsCard">
          <div className="tableHeader">
            <div className="thName">Nome</div>
            <div className="thWealth">Patrimônio</div>
            <div className="thUpdate">Última atualização</div>
          </div>
          {MOCK_ROWS.map((row) => (
            <div key={row.id} className="tableRow">
              <div className="tdName">
                <div className="avatar" />
                <span>{row.name}</span>
              </div>
              <div className="tdWealth">{formatBRL(row.wealth)}</div>
              <div className="tdUpdate">
                <span
                  className={`badge ${
                    row.monthsDelta >= 0 ? "badgeNeg" : "badgePos"
                  }`}
                >
                  {row.monthsDelta >= 0
                    ? `+ ${row.monthsDelta} meses`
                    : ` ${row.monthsDelta} meses`}
                </span>
              </div>
            </div>
          ))}
          <div className="tableFooter">
            <button className="pagerBtn">←</button>
            <span>Página 1 de 10</span>
            <button className="pagerBtn">→</button>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="clientsCard">
          <p className="clientsCardTitle">Clientes com planejamento</p>
          <div className="gaugeWrap">
            <div className="gauge">
              <svg
                className="gaugeSvg"
                viewBox="0 0 100 100"
                aria-label="progresso clientes com planejamento"
              >
                <defs>
                  <linearGradient
                    id="gaugeGrad"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#22c55e" />
                    <stop offset="100%" stopColor="#a3e635" />
                  </linearGradient>
                </defs>
                <circle className="gaugeBg" cx="50" cy="50" r="42" />
                <circle
                  className="gaugeFg"
                  cx="50"
                  cy="50"
                  r="42"
                  strokeDasharray={`${
                    Math.max(0, Math.min(100, gauge.percent)) * 2.638
                  }, 999`}
                />
              </svg>
              <div className="gaugeCenter">
                <div
                  className={`trendArrow ${
                    gauge.trend >= 0 ? "trendUp" : "trendDown"
                  }`}
                  aria-hidden
                />
                <div className="gaugeText">
                  <div className="gaugeValue">{gauge.percent}%</div>
                  <div className="gaugeSub">{gauge.label}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="clientsCard space-y-4">
          <p className="clientsCardTitle">
            Perfis com seguro pelo total de clientes
          </p>
          {[
            { p: 60, t: "Com filho", prev: 52 },
            { p: 50, t: "Solteiro", prev: 55 },
            { p: 40, t: "Com dependentes", prev: 38 },
          ].map((d) => {
            const trend = d.p - d.prev;
            const dash = `${Math.max(0, Math.min(100, d.p)) * 2.638}, 999`;
            return (
              <div
                key={d.t}
                className="bg-gray-900 rounded-xl p-4 flex items-center gap-4"
              >
                <div className="miniGauge">
                  <svg className="miniGaugeSvg" viewBox="0 0 100 100">
                    <circle className="gaugeBg" cx="50" cy="50" r="42" />
                    <circle
                      className="miniGaugeFg"
                      cx="50"
                      cy="50"
                      r="42"
                      strokeDasharray={dash}
                    />
                  </svg>
                  <div className="miniGaugeCenter">
                    <div
                      className={`trendArrow ${
                        trend >= 0 ? "trendUp" : "trendDown"
                      }`}
                    />
                  </div>
                </div>
                <div>
                  <div className="text-blue-400 text-lg font-bold">{d.p}%</div>
                  <div className="text-gray-300 text-sm">{d.t}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
