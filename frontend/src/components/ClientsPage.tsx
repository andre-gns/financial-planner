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
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v);

  const gauge = useMemo(
    () => ({ percent: 75, label: "219 clientes" }),
    []
  );

  return (
    <div className="dashboardContainer clientsGrid">
      <div className="clientsLeft">
        <div className="clientsCard">
          <p className="clientsCardTitle">Alinhamento com planejamento</p>
          <div className="stackBars">
            {[{l:"Superior a 90%",c:"#22c55e",p:14},{l:"90% a 70%",c:"#eab308",p:20},{l:"70% a 50%",c:"#f97316",p:45},{l:"Inferior a 50%",c:"#ef4444",p:21}].map((r)=> (
              <div className="stackRow" key={r.l}>
                <span className="stackLabel">{r.l}</span>
                <div className="stackTrack">
                  <div className="stackFill" style={{ width: `${r.p}%`, background: r.c }} />
                </div>
                <span className="stackLabel" style={{width:32}}>{r.p}%</span>
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
                <span className={`badge ${row.monthsDelta >= 0 ? "badgeNeg" : "badgePos"}`}>
                  {row.monthsDelta >= 0 ? `+ ${row.monthsDelta} meses` : ` ${row.monthsDelta} meses`}
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
            <div className="text-center">
              <div className="gaugeValue">{gauge.percent}%</div>
              <div className="gaugeSub">{gauge.label}</div>
            </div>
          </div>
        </div>

        <div className="clientsCard space-y-4">
          {[{p:60,t:"Com filho"},{p:50,t:"Solteiro"},{p:40,t:"Com dependentes"}].map((d)=> (
            <div key={d.t} className="bg-gray-900 rounded-xl p-4 flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 opacity-80" />
              <div>
                <div className="text-blue-400 text-lg font-bold">{d.p}%</div>
                <div className="text-gray-300 text-sm">{d.t}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


