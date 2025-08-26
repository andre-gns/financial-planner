import { useState, useEffect } from "react";
import axios from "axios";

interface Client {
  id: string;
  name: string;
  email: string;
  age: number;
  status: string;
  familyProfile?: string;
}

const ClientDashboard = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const apiUrl = "http://localhost:3001/clients";
        const response = await axios.get(apiUrl);
        setClients(response.data);
      } catch (err: any) {
        console.error("Houve um erro ao buscar os clientes!", err);
        if (axios.isAxiosError(err) && err.message === "Network Error") {
          setError(
            "Erro de conexão. Por favor, verifique se o servidor backend está em execução na porta 3001."
          );
        } else if (err.response) {
          setError(
            `Erro do servidor: ${err.response.status} - ${err.response.statusText}`
          );
        } else {
          setError("Não foi possível carregar os dados dos clientes.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-400">Carregando...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-center p-4">
        <p className="text-red-500 font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-8 bg-gray-900 min-h-screen text-white">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Clientes</h2>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center cursor-pointer">
            ...
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center cursor-pointer">
            ...
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center cursor-pointer">
            ...
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 shadow-md">
          <h3 className="text-lg font-medium mb-4">
            Alinhamento com planejamento
          </h3>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">Superior a 90%</span>
              <div className="w-full h-4 bg-gray-600 rounded-full overflow-hidden">
                <div className="w-[14%] h-full bg-green-500 rounded-full"></div>
              </div>
              <span className="text-sm font-semibold text-green-500">14%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">90% a 70%</span>
              <div className="w-full h-4 bg-gray-600 rounded-full overflow-hidden">
                <div className="w-[20%] h-full bg-yellow-500 rounded-full"></div>
              </div>
              <span className="text-sm font-semibold text-yellow-500">20%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">70% a 50%</span>
              <div className="w-full h-4 bg-gray-600 rounded-full overflow-hidden">
                <div className="w-[45%] h-full bg-orange-500 rounded-full"></div>
              </div>
              <span className="text-sm font-semibold text-orange-500">45%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">Inferior a 50%</span>
              <div className="w-full h-4 bg-gray-600 rounded-full overflow-hidden">
                <div className="w-[21%] h-full bg-red-500 rounded-full"></div>
              </div>
              <span className="text-sm font-semibold text-red-500">21%</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 shadow-md flex flex-col items-center justify-center text-center">
          <h3 className="text-lg font-medium mb-4">
            Clientes com planejamento
          </h3>
          <div className="relative w-32 h-32 flex items-center justify-center">
            <svg
              viewBox="0 0 100 100"
              className="absolute top-0 left-0 w-full h-full"
            >
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="#374151"
                strokeWidth="10"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="#22c55e"
                strokeWidth="10"
                fill="none"
                strokeDasharray="282.7" // 90 * Math.PI * 2
                strokeDashoffset="70.675" // 282.7 * (1 - 0.75)
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
              />
            </svg>
            <span className="text-3xl font-bold text-white">75%</span>
          </div>
          <p className="text-gray-400 mt-2">219 clientes</p>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 shadow-md">
          <h3 className="text-lg font-medium mb-4">
            Perfis com seguro pelo total
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Com filho</span>
              <div className="w-24 h-24 relative flex items-center justify-center">
                <svg
                  viewBox="0 0 100 100"
                  className="absolute top-0 left-0 w-full h-full"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="#374151"
                    strokeWidth="10"
                    fill="none"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="#3b82f6"
                    strokeWidth="10"
                    fill="none"
                    strokeDasharray="282.7"
                    strokeDashoffset="113.08" // 282.7 * (1 - 0.6)
                    transform="rotate(-90 50 50)"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="text-lg font-bold">60%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Solteiro</span>
              <div className="w-24 h-24 relative flex items-center justify-center">
                <svg
                  viewBox="0 0 100 100"
                  className="absolute top-0 left-0 w-full h-full"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="#374151"
                    strokeWidth="10"
                    fill="none"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="#8b5cf6"
                    strokeWidth="10"
                    fill="none"
                    strokeDasharray="282.7"
                    strokeDashoffset="141.35" // 282.7 * (1 - 0.5)
                    transform="rotate(-90 50 50)"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="text-lg font-bold">50%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Com dependentes</span>
              <div className="w-24 h-24 relative flex items-center justify-center">
                <svg
                  viewBox="0 0 100 100"
                  className="absolute top-0 left-0 w-full h-full"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="#374151"
                    strokeWidth="10"
                    fill="none"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="#ec4899"
                    strokeWidth="10"
                    fill="none"
                    strokeDasharray="282.7"
                    strokeDashoffset="169.62" // 282.7 * (1 - 0.4)
                    transform="rotate(-90 50 50)"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="text-lg font-bold">40%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl p-6 shadow-md mt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Atualização do planejamento</h3>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center cursor-pointer">
              ...
            </span>
            <span className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center cursor-pointer">
              ...
            </span>
          </div>
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="py-2 px-4 text-sm font-medium text-gray-400">
                Nome
              </th>
              <th className="py-2 px-4 text-sm font-medium text-gray-400">
                Patrimônio
              </th>
              <th className="py-2 px-4 text-sm font-medium text-gray-400">
                Última atualização
              </th>
              <th className="py-2 px-4 text-sm font-medium text-gray-400">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr
                key={client.id}
                className="border-b border-gray-700 hover:bg-gray-700"
              >
                <td className="py-4 px-4 flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-500 mr-3"></div>
                  {client.name}
                </td>
                <td className="py-4 px-4 text-gray-400">R$ --</td>
                <td className="py-4 px-4 text-red-500 font-semibold">
                  + 6 meses
                </td>
                <td className="py-4 px-4">...</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientDashboard;
