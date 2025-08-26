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

function ClientList() {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/clients")
      .then((response) => {
        setClients(response.data);
      })
      .catch((error) => {
        console.error("Houve um erro ao buscar os clientes!", error);
      });
  }, []);

  return (
    <div>
      <h2>Lista de Clientes</h2>
      <ul>
        {clients.map((client) => (
          <li key={client.id}>
            <strong>{client.name}</strong> - {client.email} ({client.age} anos)
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ClientList;
