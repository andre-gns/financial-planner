import { useState, useEffect } from "react";
import axios from "axios";

interface Goal {
  id: string;
  title: string;
  targetAmount: number;
  clientId: string;
}

function GoalList() {
  const [goals, setGoals] = useState<Goal[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/goals")
      .then((response) => {
        setGoals(response.data);
      })
      .catch((error) => {
        console.error("Houve um erro ao buscar as metas!", error);
      });
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Lista de Metas</h2>
      <ul className="space-y-4">
        {goals.map((goal) => (
          <li key={goal.id} className="p-4 bg-gray-800 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">{goal.title}</h3>
            <p className="text-gray-400">ID do Cliente: {goal.clientId}</p>
            <p className="text-orange-400 font-medium">
              Meta: R$ {goal.targetAmount}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GoalList;
