import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AgendamentoInteligente() {
  const [nome, setNome] = useState("");
  const [data, setData] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [servico, setServico] = useState("");
  const [servicos, setServicos] = useState([]);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/servicos")
      .then(res => setServicos(res.data))
      .catch(err => console.error(err));
  }, []);

  const agendar = async () => {
    if (!nome || !data || !horaInicio || !servico)
      return setMensagem("Preencha todos os campos");

    try {
      const res = await axios.post("http://localhost:5000/agendamento", {
        nome_cliente: nome,
        data,
        hora_inicio: horaInicio,
        id_servico: servico
      });

      setMensagem(res.data.msg);
      setNome(""); setData(""); setHoraInicio(""); setServico("");
    } catch (err) {
      setMensagem(err.response?.data?.erro || "Erro ao agendar");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6">
      <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6">Agendamento Inteligente</h1>

        <input type="text" placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} className="w-full border px-4 py-2 rounded mb-4" />
        <input type="date" value={data} onChange={e => setData(e.target.value)} className="w-full border px-4 py-2 rounded mb-4" />
        <input type="time" value={horaInicio} onChange={e => setHoraInicio(e.target.value)} className="w-full border px-4 py-2 rounded mb-4" />

        <select value={servico} onChange={e => setServico(e.target.value)} className="w-full border px-4 py-2 rounded mb-4">
          <option value="">Selecione o serviço</option>
          {servicos.map(s => (
            <option key={s.id_servicos} value={s.id_servicos}>
              {s.servico} ({s.duracao_min} min)
            </option>
          ))}
        </select>

        <button onClick={agendar} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Confirmar Agendamento
        </button>

        {mensagem && <div className="mt-4 text-center text-yellow-700 bg-yellow-100 p-2 rounded">{mensagem}</div>}
      </div>
    </div>
  );
}
