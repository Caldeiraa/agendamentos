import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Agendamento() {
  const [nome_cliente, setNomeCliente] = useState("");
  const [data, setData] = useState("");
  const [horario, setHorario] = useState("");
  const [servicos, setServicos] = useState("");

  const [listaHorarios, setListaHorarios] = useState([]);
  const [listaServicos, setListaServicos] = useState([]);
  const [mensagem, setMensagem] = useState("");

  // Buscar lista de serviços
  useEffect(() => {
    axios
      .get("http://localhost:5000/precos")
      .then((res) => setListaServicos(res.data))
      .catch((err) => console.error("Erro ao buscar serviços:", err));
  }, []);

  // Buscar horários disponíveis dinamicamente
  useEffect(() => {
    if (!data || !servicos) {
      setListaHorarios([]);
      return;
    }

    const diaSemana = new Date(`${data}T00:00:00`).getDay();
    if (diaSemana === 0 || diaSemana === 1) {
      setListaHorarios([]);
      setMensagem("Domingo e segunda indisponíveis.");
      return;
    }

    axios
      .get(
        `http://localhost:5000/horarios-disponiveis-dinamicos?data=${data}&id_servico=${servicos}`
      )
      .then((res) => {
        setListaHorarios(res.data);
        setMensagem("");
      })
      .catch((err) => {
        console.error("Erro ao buscar horários:", err);
        setListaHorarios([]);
        setMensagem("Erro ao buscar horários.");
      });
  }, [data, servicos]);

  const handleAgendamento = async () => {
    if (!nome_cliente || !data || !horario || !servicos) {
      setMensagem("Preencha todos os campos.");
      return;
    }

    const diaSemana = new Date(data).getDay();
    if (diaSemana === 0 || diaSemana === 1) {
      setMensagem("Domingo e segunda indisponíveis.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/agendamento", {
        nome_cliente,
        data,
        horario,
        servicos: Number(servicos),
      });

      setMensagem("Agendamento realizado com sucesso!");
      setNomeCliente("");
      setData("");
      setHorario("");
      setServicos("");
      setListaHorarios([]);
    } catch (error) {
      console.error("Erro ao agendar:", error);
      setMensagem(error.response?.data?.erro || "Erro ao agendar.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-lg bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Agendamento de Serviço
        </h2>

        {/* Nome */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Seu nome</label>
          <input
            type="text"
            value={nome_cliente}
            onChange={(e) => setNomeCliente(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ex: João Silva"
          />
        </div>

        {/* Data */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Data desejada</label>
          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Serviço */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Escolha o serviço</label>
          <select
            value={servicos}
            onChange={(e) => setServicos(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Selecione...</option>
            {listaServicos.map((s) => (
              <option key={s.id} value={s.id}>
                {s.nome}
              </option>
            ))}
          </select>
        </div>

        {/* Horário Dinâmico */}
        <div className="mb-6">
          <label className="block mb-2 font-medium">Escolha o horário</label>
          <input
            type="time"
            step="60" // 1 minuto
            value={horario}
            onChange={(e) => setHorario(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            min={listaHorarios[0]}
            max={listaHorarios[listaHorarios.length - 1]}
            list="horarios-sugeridos"
          />
          <datalist id="horarios-sugeridos">
            {listaHorarios.map((h, i) => (
              <option key={i} value={h} />
            ))}
          </datalist>
        </div>


        {/* Botão de Agendar */}
        <button
          onClick={handleAgendamento}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Confirmar Agendamento
        </button>

        {/* Mensagem de feedback */}
        {mensagem && (
          <div className="mt-4 px-4 py-2 text-center bg-yellow-100 text-yellow-800 rounded-md">
            {mensagem}
          </div>
        )}
      </div>
    </div>
  );
}
