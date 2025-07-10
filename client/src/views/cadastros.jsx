// FRONTEND COMPLETO (React + Tailwind)
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function CadastrarServicosHorarios() {
  const [servico, setServico] = useState("");
  const [horario, setHorario] = useState("");
  const [inicio, setInicio] = useState("");
  const [fim, setFim] = useState("");
  const [preco, setPreco] = useState("");
  const [duracao, setDuracao] = useState("");
  const [servicoSelecionado, setServicoSelecionado] = useState("");

  const [servicos, setServicos] = useState([]);
  const [horarios, setHorarios] = useState([]);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/servicos").then(res => setServicos(res.data));
    axios.get("http://localhost:5000/horarios").then(res => setHorarios(res.data));
  }, []);

  const cadastrarServico = async () => {
    if (!servico) return setMensagem("Informe o nome do serviço.");
    try {
      await axios.post("http://localhost:5000/servico", { servico });
      setServico("");
      setMensagem("Serviço cadastrado com sucesso!");
    } catch {
      setMensagem("Erro ao cadastrar serviço.");
    }
  };

  const cadastrarHorario = async () => {
    if (!horario) return setMensagem("Informe o horário.");
    try {
      await axios.post("http://localhost:5000/horario", { horario });
      setHorario("");
      setMensagem("Horário cadastrado com sucesso!");
    } catch {
      setMensagem("Erro ao cadastrar horário.");
    }
  };

  const salvarPreco = async () => {
    if (!servicoSelecionado || !preco || !duracao) {
      return setMensagem("Informe serviço, preço e duração.");
    }
    try {
      await axios.post("http://localhost:5000/precos", {
        id_servico: servicoSelecionado,
        preco,
        duracao
      });
      setMensagem("Preço e duração salvos com sucesso!");
      setPreco("");
      setDuracao("");
    } catch {
      setMensagem("Erro ao salvar preço e duração.");
    }
  };

  const definirHorarioFuncionamento = async () => {
    if (!inicio || !fim) return setMensagem("Informe horário de início e fim.");
    try {
      await axios.post("http://localhost:5000/horario-funcionamento", { inicio, fim });
      setMensagem("Horário de funcionamento cadastrado!");
      setInicio("");
      setFim("");
    } catch {
      setMensagem("Erro ao definir horário de funcionamento.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-6">Serviços e Horários</h2>

        {/* Serviço */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-2">Cadastrar Serviço</h3>
          <div className="flex flex-col sm:flex-row gap-2">
            <input type="text" value={servico} onChange={(e) => setServico(e.target.value)} placeholder="Ex: Corte, Barba" className="border rounded px-4 py-2 w-full" />
            <button onClick={cadastrarServico} className="bg-blue-600 text-white px-4 py-2 rounded">Adicionar</button>
          </div>
        </div>

        {/* Preço + Tempo */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-2">Preço e Duração</h3>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
            <select value={servicoSelecionado} onChange={(e) => setServicoSelecionado(e.target.value)} className="border rounded px-4 py-2">
              <option value="">Selecione o serviço</option>
              {servicos.map((s) => (
                <option key={s.id_servicos} value={s.id_servicos}>{s.servico}</option>
              ))}
            </select>
            <input type="number" min="0" value={preco} onChange={(e) => setPreco(e.target.value)} placeholder="Preço (R$)" className="border rounded px-4 py-2" />
            <input type="number" min="1" value={duracao} onChange={(e) => setDuracao(e.target.value)} placeholder="Duração (min)" className="border rounded px-4 py-2" />
            <button onClick={salvarPreco} className="bg-purple-600 text-white px-4 py-2 rounded">Salvar</button>
          </div>
        </div>

        {/* Horários */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-2">Cadastrar Horário</h3>
          <div className="flex flex-col sm:flex-row gap-2">
            <input type="time" value={horario} onChange={(e) => setHorario(e.target.value)} className="border rounded px-4 py-2 w-full" />
            <button onClick={cadastrarHorario} className="bg-green-600 text-white px-4 py-2 rounded">Adicionar</button>
          </div>
        </div>

        {/* Funcionamento */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-2">Horário de Funcionamento</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <input type="time" value={inicio} onChange={(e) => setInicio(e.target.value)} className="border rounded px-4 py-2" />
            <input type="time" value={fim} onChange={(e) => setFim(e.target.value)} className="border rounded px-4 py-2" />
            <button onClick={definirHorarioFuncionamento} className="bg-orange-600 text-white px-4 py-2 rounded">Salvar</button>
          </div>
        </div>

        {mensagem && <div className="mt-4 bg-yellow-100 text-yellow-800 px-4 py-2 rounded text-center">{mensagem}</div>}
      </div>
    </div>
  );
}
