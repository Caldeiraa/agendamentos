import React, { useState, useEffect } from "react";
import axios from "axios";

export default function CadastrarServicosHorarios() {
  const [servico, setServico] = useState("");
  const [horario, setHorario] = useState("");

  const [servicos, setServicos] = useState([]);
  const [horarios, setHorarios] = useState([]);

  const [servicoSelecionado, setServicoSelecionado] = useState("");
  const [preco, setPreco] = useState("");

  const [mensagem, setMensagem] = useState("");

  const fetchServicos = () => {
    axios.get("http://localhost:5000/servicos")
      .then(res => setServicos(res.data))
      .catch(err => console.error("Erro ao carregar serviços:", err));
  };

  const fetchHorarios = () => {
    axios.get("http://localhost:5000/horarios")
      .then(res => setHorarios(res.data))
      .catch(err => console.error("Erro ao carregar horários:", err));
  };

  useEffect(() => {
    fetchServicos();
    fetchHorarios();
  }, []);

  const cadastrarServico = async () => {
    if (!servico) return setMensagem("Informe o nome do serviço.");

    try {
      await axios.post("http://localhost:5000/servico", { servico });
      setServico("");
      setMensagem("Serviço cadastrado com sucesso!");
      fetchServicos();
    } catch (err) {
      console.error(err);
      setMensagem("Erro ao cadastrar serviço.");
    }
  };

  const cadastrarHorario = async () => {
    if (!horario) return setMensagem("Informe o horário.");

    try {
      await axios.post("http://localhost:5000/horario", { horario });
      setHorario("");
      setMensagem("Horário cadastrado com sucesso!");
      fetchHorarios();
    } catch (err) {
      console.error(err);
      setMensagem("Erro ao cadastrar horário.");
    }
  };

  const salvarPreco = async () => {
    if (!servicoSelecionado || !preco) {
      return setMensagem("Selecione um serviço e informe o preço.");
    }

    try {
      await axios.post("http://localhost:5000/precos", {
        id_servico: servicoSelecionado,
        preco,
      });

      setMensagem("Preço atribuído com sucesso!");
      setServicoSelecionado("");
      setPreco("");
      fetchServicos();
    } catch (err) {
      console.error(err);
      setMensagem("Erro ao atribuir preço.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Cadastro de Serviços e Horários</h2>

        {/* Cadastro de serviço */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-2">Cadastrar Serviço</h3>
          <div className="flex gap-2 flex-col sm:flex-row">
            <input
              type="text"
              value={servico}
              onChange={(e) => setServico(e.target.value)}
              placeholder="Ex: Corte, Barba"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
            <button
              onClick={cadastrarServico}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Adicionar
            </button>
          </div>
          <ul className="mt-4 list-disc pl-5 text-gray-700">
            {servicos.map((s) => (
              <li key={s.id_servicos}>
                {s.servico}
                {s.preco && (
                  <span className="text-sm text-gray-500 ml-2">
                    – R$ {parseFloat(s.preco).toFixed(2)}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Atribuir preço ao serviço */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-2">Atribuir Preço a Serviço</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <select
              value={servicoSelecionado}
              onChange={(e) => setServicoSelecionado(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2"
            >
              <option value="">Selecione um serviço</option>
              {servicos.map((s) => (
                <option key={s.id_servicos} value={s.id_servicos}>
                  {s.servico}
                </option>
              ))}
            </select>
            <input
              type="number"
              min="0"
              step="0.01"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
              placeholder="Preço (R$)"
              className="border border-gray-300 rounded-lg px-4 py-2"
            />
            <button
              onClick={salvarPreco}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
            >
              Salvar Preço
            </button>
          </div>
        </div>

        {/* Cadastro de horário */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Cadastrar Horário</h3>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="time"
              value={horario}
              onChange={(e) => setHorario(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
            <button
              onClick={cadastrarHorario}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              Adicionar
            </button>
          </div>
          <ul className="mt-4 list-disc pl-5 text-gray-700">
            {horarios.map((h) => (
              <li key={h.id_horario}>{h.horario.slice(0, 5)}</li>
            ))}
          </ul>
        </div>

        {mensagem && (
          <div className="mt-4 bg-yellow-100 text-yellow-800 px-4 py-2 rounded text-center">
            {mensagem}
          </div>
        )}
      </div>
    </div>
  );
}
