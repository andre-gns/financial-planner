import React, { useState } from "react";

interface SidebarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const NAV_ITEMS: Array<{ key: string; label: string; icon: React.ReactNode }> =
  [
    {
      key: "clientes",
      label: "Clientes",
      icon: (
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
        </svg>
      ),
    },
    {
      key: "prospects",
      label: "Prospects",
      icon: (
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5z" />
          <path d="M2 22a10 10 0 0 1 20 0" />
        </svg>
      ),
    },
    {
      key: "consolidacao",
      label: "Consolidação",
      icon: (
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z" />
        </svg>
      ),
    },
    {
      key: "crm",
      label: "CRM",
      icon: (
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M3 7h18M3 12h18M3 17h18" />
        </svg>
      ),
    },
    {
      key: "captacao",
      label: "Captação",
      icon: (
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M12 19V6" />
          <path d="M5 12l7-7 7 7" />
        </svg>
      ),
    },
    {
      key: "financeiro",
      label: "Financeiro",
      icon: (
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M3 6h18v12H3z" />
          <path d="M16 10h4" />
        </svg>
      ),
    },
  ];

const Sidebar: React.FC<SidebarProps> = ({ currentPage, setCurrentPage }) => {
  const [isClientsOpen, setIsClientsOpen] = useState(true);

  const CLIENTS_CHILDREN: Array<{ key: string; label: string }> = [
    { key: "dashboard", label: "Dashboard" },
    { key: "projecao", label: "Projeção" },
    { key: "historico", label: "Histórico" },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebarInner">
        <div className="sidebarHeader">
          <button className="brandPill" aria-label="Anka">
            <span className="w-4 h-4 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-black">
              ★
            </span>
            <span className="ml-2">Anka</span>
          </button>
        </div>
        <nav className="navList">
          {NAV_ITEMS.map((item) => {
            if (item.key === "clientes") {
              return (
                <div key={item.key}>
                  <button
                    className={`navItem ${
                      currentPage === "clientes" ? "navItemActive" : ""
                    }`}
                    onClick={() => {
                      setCurrentPage("clientes");
                      setIsClientsOpen((v) => !v);
                    }}
                    aria-expanded={isClientsOpen}
                    aria-controls="clientes-submenu"
                  >
                    <span className="navIcon" aria-hidden>
                      {item.icon}
                    </span>
                    <span className="navLabel">{item.label}</span>
                    <span className="navChevron" aria-hidden>
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        style={{
                          transform: isClientsOpen
                            ? "rotate(90deg)"
                            : "rotate(0deg)",
                          transition: "transform 0.15s ease",
                        }}
                      >
                        <path d="M9 6l6 6-6 6" />
                      </svg>
                    </span>
                  </button>
                  {isClientsOpen && (
                    <div id="clientes-submenu" className="ml-6 mt-1 space-y-1">
                      {CLIENTS_CHILDREN.map((sub) => (
                        <button
                          key={sub.key}
                          className={`navItem ${
                            currentPage === sub.key ? "navItemActive" : ""
                          }`}
                          onClick={() => setCurrentPage(sub.key)}
                        >
                          <span className="navLabel">{sub.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <button
                key={item.key}
                className={`navItem ${
                  currentPage === item.key ? "navItemActive" : ""
                }`}
                onClick={() => setCurrentPage(item.key)}
              >
                <span className="navIcon" aria-hidden>
                  {item.icon}
                </span>
                <span className="navLabel">{item.label}</span>
                <span className="navChevron" aria-hidden>
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M9 6l6 6-6 6" />
                  </svg>
                </span>
              </button>
            );
          })}
        </nav>
        <div className="sidebarFooter">v0.1.0</div>
      </div>
    </aside>
  );
};

export default Sidebar;
