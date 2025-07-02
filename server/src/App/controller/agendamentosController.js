import {
  inserirAgendamento,
  listarAgendamentos
} from '../models/agendamentoModel.js';

export const criarAgendamento = (req, res) => {
  const { nome_cliente, data, horario, servicos } = req.body;

  if (!nome_cliente || !data || !horario || !servicos) {
    return res.status(400).json({ erro: 'Preencha todos os campos.' });
  }

  inserirAgendamento({ nome_cliente, data, horario, servicos }, (err, resultado) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ erro: 'Erro ao salvar no banco.' });
    }
    res.status(201).json({ mensagem: 'Agendamento realizado com sucesso!' });
  });
};

export const obterAgendamentos = (req, res) => {
  listarAgendamentos((err, resultados) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ erro: 'Erro ao buscar agendamentos.' });
    }
    res.status(200).json(resultados);
  });
};
