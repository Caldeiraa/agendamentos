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

  useEffect(() => {
    axios.get("http://localhost:5000/servicos")
      .then(res => setListaServicos(res.data))
      .catch(err => console.error("Erro ao buscar serviços:", err));
  }, []);

  useEffect(() => {
    if (!data) {
      setListaHorarios([]);
      return;
    }

    const diaSemana = new Date(data).getDay();
    if (diaSemana === 0 || diaSemana === 1) {
      setListaHorarios([]);
      setMensagem("Não é possível agendar em domingos ou segundas-feiras.");
      return;
    }

    axios
      .get(`http://localhost:5000/horarios-dis?data=${data}`)
      .then(res => {
        setListaHorarios(res.data);
        setMensagem("");
      })
      .catch(err => {
        console.error("Erro ao buscar horários disponíveis:", err);
        setListaHorarios([]);
        setMensagem("Erro ao buscar horários.");
      });
  }, [data]);

  const handleAgendamento = async () => {
    if (!nome_cliente || !data || !horario || !servicos) {
      setMensagem("Preencha todos os campos.");
      return;
    }

    const diaSemana = new Date(data).getDay();
    if (diaSemana === 0 || diaSemana === 1) {
      setListaHorarios([]);
      setMensagem("Não é possível agendar em domingos ou segundas-feiras.");
      return;
    }


    try {
      await axios.post("http://localhost:5000/agendamento", {
        nome_cliente,
        data,
        horario,
        servicos,
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800">
          Agendamento de Serviço
        </h2>

        {/* Nome */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Nome</label>
          <input
            type="text"
            value={nome_cliente}
            onChange={(e) => setNomeCliente(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            placeholder="Digite seu nome"
          />
        </div>

        {/* Data */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Data</label>
          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>

        {/* Horário */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Horário</label>
          {listaHorarios.length > 0 ? (
            <div className="grid grid-cols-3 gap-2">
              {listaHorarios.map((h) => (
                <button
                  key={h.id_horario}
                  type="button"
                  onClick={() => setHorario(String(h.id_horario))}
                  className={`py-2 px-3 rounded-lg text-sm border font-semibold transition ${horario === String(h.id_horario)
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-blue-100"
                    }`}
                >
                  {h.horario.slice(0, 5)}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 mt-1">
              {data ? "Nenhum horário disponível para esta data." : "Selecione uma data para ver os horários disponíveis."}
            </p>
          )}
        </div>

        {/* Serviço */}
        <div className="mb-6">
          <label className="block font-medium mb-1">Serviço</label>
          <select
            value={servicos}
            onChange={(e) => setServicos(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          >
            <option value="">Selecione um serviço</option>
            {listaServicos.map((s) => (
              <option key={s.id_servicos} value={String(s.id_servicos)}>
                {s.servico}
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

        {mensagem && (
          <div className="mt-4 bg-yellow-100 text-yellow-800 px-4 py-2 rounded text-center">
            {mensagem}
          </div>
        )}
      </div>
    </div>
  );
}
