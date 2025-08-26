import { useState } from "react";
import Sidebar from "./components/Sidebar";
import ClientDashboard from "./components/ClientDashboard";
import GoalList from "./components/GoalList";

function App() {
  const [currentPage, setCurrentPage] = useState("clients");

  const renderContent = () => {
    switch (currentPage) {
      case "clients":
        return <ClientDashboard />;
      case "goals":
        return <GoalList />;
      default:
        return <ClientDashboard />;
    }
  };

  return (
    <div className="flex bg-gray-900 min-h-screen text-white">
      <Sidebar setCurrentPage={setCurrentPage} />
      <div className="flex-1 p-8">{renderContent()}</div>
    </div>
  );
}

export default App;
