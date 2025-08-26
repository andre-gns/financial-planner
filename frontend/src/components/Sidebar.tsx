import React from "react";

interface SidebarProps {
  setCurrentPage: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setCurrentPage }) => {
  return (
    <div className="w-64 bg-gray-800 text-gray-400 p-6 flex flex-col items-center">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-orange-500">Anka</h2>
      </div>
      <ul className="w-full">
        <li
          className="p-3 mb-2 rounded-lg cursor-pointer hover:bg-gray-700"
          onClick={() => setCurrentPage("clients")}
        >
          <a className="text-white">Clientes</a>
        </li>
        <li
          className="p-3 mb-2 rounded-lg cursor-pointer hover:bg-gray-700"
          onClick={() => setCurrentPage("goals")}
        >
          <a className="text-white">Metas</a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
