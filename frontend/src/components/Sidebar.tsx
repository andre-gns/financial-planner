import React from "react";

interface SidebarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const NAV_ITEMS: Array<{ key: string; label: string; icon: React.ReactNode }> =
  [
    {
      key: "dashboard",
      label: "Dashboard",
      icon: (
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M3 12l9-9 9 9" />
          <path d="M9 21V9h6v12" />
        </svg>
      ),
    },
    {
      key: "projecao",
      label: "Projeção",
      icon: (
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M3 3v18h18" />
          <path d="M6 15l4-4 3 3 5-7" />
        </svg>
      ),
    },
    {
      key: "historico",
      label: "Histórico",
      icon: (
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M12 8v5l3 3" />
          <path d="M3 12a9 9 0 1 0 9-9 9 9 0 0 0-9 9z" />
        </svg>
      ),
    },
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
      key: "metas",
      label: "Metas",
      icon: (
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M7 12h10M12 7v10" />
        </svg>
      ),
    },
  ];

const Sidebar: React.FC<SidebarProps> = ({ currentPage, setCurrentPage }) => {
  return (
    <aside className="sidebar">
      <div className="sidebarInner">
        <div className="sidebarHeader">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-orange-500 text-black flex items-center justify-center font-extrabold">
              A
            </div>
            <h2 className="sidebarLogo">Anka</h2>
          </div>
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
                {item.icon}
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
