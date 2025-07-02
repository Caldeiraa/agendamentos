import React, { useState } from "react";
import "tailwindcss";

const horariosDisponiveis = [
  "09:00", "10:00", "11:00",
  "13:00", "14:00", "15:00",
  "16:00", "17:00",
];

const servicos = ["Corte de cabelo", "Manicure", "Consulta", "Massagem"];

export default function Agendamento() {
  const [data, setData] = useState("");
  const [horario, setHorario] = useState("");
  const [servico, setServico] = useState("");
  const [nome, setNome] = useState("");
  const [confirmado, setConfirmado] = useState(false);

  const handleAgendamento = () => {
    if (data && horario && servico && nome) {
      setConfirmado(true);
      setTimeout(() => setConfirmado(false), 4000);
    } else {
      alert("Preencha todos os campos.");
    }
  };

  return (
   <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
  <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
    <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800">
      Agendamento de Serviço
    </h2>

    <div className="mb-6">
      <label className="block mb-2 text-md font-medium text-gray-700">Seu Nome</label>
      <input
        type="text"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Digite seu nome"
      />
    </div>

    <div className="mb-6">
      <label className="block mb-2 text-md font-medium text-gray-700">Data</label>
      <input
        type="date"
        value={data}
        onChange={(e) => setData(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div className="mb-8">
      <label className="block mb-2 text-md font-medium text-gray-700">Horário</label>
      <div className="grid grid-cols-4 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {horariosDisponiveis.map((hora) => (
          <button
            key={hora}
            onClick={() => setHorario(hora)}
            className={`py-3 rounded-lg text-sm font-semibold border transition
              ${
                horario === hora
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-blue-100"
              }`}
          >
            {hora}
          </button>
        ))}
      </div>
    </div>

    <div className="mb-8">
      <label className="block mb-2 text-md font-medium text-gray-700">Serviço</label>
      <select
        value={servico}
        onChange={(e) => setServico(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Selecione um serviço</option>
        {servicos.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
    </div>

    <button
      onClick={handleAgendamento}
      className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
    >
      Confirmar Agendamento
    </button>

    {confirmado && (
      <div className="mt-6 bg-green-100 text-green-700 px-5 py-3 rounded-lg text-center font-medium">
        Agendamento realizado com sucesso!
      </div>
    )}
  </div>
</div>

  );
}
