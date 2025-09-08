import { useState } from "react";
import Sidebar from "./components/Sidebar";
import ClientDashboard from "./components/ClientDashboard";
import GoalList from "./components/GoalList";
import ProjectionPage from "./components/ProjectionPage";
import HistoryPage from "./components/HistoryPage";

function App() {
  const [currentPage, setCurrentPage] = useState("dashboard");

  const renderContent = () => {
    switch (currentPage) {
      case "dashboard":
        return <ClientDashboard />;
      case "projecao":
        return <ProjectionPage />;
      case "historico":
        return <HistoryPage />;
      case "clientes":
        return <ClientDashboard />;
      case "metas":
        return <GoalList />;
      default:
        return <ClientDashboard />;
    }
  };

  return (
    <div className="flex bg-gray-900 min-h-screen text-white">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className="flex-1 p-8">{renderContent()}</div>
    </div>
  );
}

export default App;
