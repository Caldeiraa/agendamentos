import React, { useEffect, useState } from 'react';

const Agendamentos = () => {
  const [agendamentos, setAgendamentos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/agendamentos')
      .then((res) => res.json())
      .then((data) => setAgendamentos(data))
      .catch((err) => console.error('Erro ao buscar agendamentos:', err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Lista de Agendamentos
        </h1>

        <div className="grid gap-6">
          {agendamentos.map((item) => (
            <div
              key={item.id_agendamentos}
              className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                Cliente: <span className="text-blue-600">{item.nome_cliente}</span>
              </h2>
              <p className="text-gray-600">
                📅 Data: {new Date(item.data).toLocaleDateString()}
              </p>
              <p className="text-gray-600">⏰ Horário: {item.horario}</p>
              <p className="text-gray-600">💇 Serviço: {item.servico}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Agendamentos;
