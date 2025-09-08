import React from "react";

interface SidebarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const NAV_ITEMS: Array<{ key: string; label: string; icon?: string }> = [
  { key: "dashboard", label: "Dashboard", icon: "🏠" },
  { key: "projecao", label: "Projeção", icon: "📈" },
  { key: "historico", label: "Histórico", icon: "🕘" },
  { key: "clientes", label: "Clientes", icon: "👤" },
  { key: "metas", label: "Metas", icon: "🎯" },
];

const Sidebar: React.FC<SidebarProps> = ({ currentPage, setCurrentPage }) => {
  return (
    <aside className="sidebar">
      <div className="sidebarInner">
        <div className="sidebarHeader">
          <h2 className="sidebarLogo">Anka</h2>
        </div>
        <nav className="navList">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.key}
              className={`navItem ${
                currentPage === item.key ? "navItemActive" : ""
              }`}
              onClick={() => setCurrentPage(item.key)}
            >
              <span className="navIcon" aria-hidden>
                {item.icon ?? "•"}
              </span>
              <span className="navLabel">{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="sidebarFooter">v0.1.0</div>
      </div>
    </aside>
  );
};

export default Sidebar;
