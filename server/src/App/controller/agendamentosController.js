const Agendamento = require("../model/agendamentos");

class AgendamentosController {
  
  criarAgendamento = (req, res) => {
    const { nome_cliente, data, horario, servicos } = req.body;

    if (!nome_cliente || !data || !horario || !servicos) {
      return res.status(400).json({ erro: 'Preencha todos os campos.' });
    }

    Agendamento.criar({ nome_cliente, data, horario, servicos })
      .then(() => {
        res.status(201).json({ mensagem: 'Agendamento realizado com sucesso!' });
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ erro: 'Erro ao salvar no banco.' });
      });
  };

  obterAgendamentos = (req, res) => {
    Agendamento.listarTodos()
      .then(resultados => {
        res.status(200).json(resultados);
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ erro: 'Erro ao buscar agendamentos.' });
      });
  };

  obterHorariosDis = (req, res) => {
    Agendamento.listarHorariosDisponiveis()
      .then(resultados => {
        res.status(200).json(resultados);
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ erro: 'Erro ao buscar agendamentos.' });
      });
  };

  obterCortes = (req, res) => {
    Agendamento.listarCortes()
      .then(resultados => {
        res.status(200).json(resultados);
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ erro: 'Erro ao buscar agendamentos.' });
      });
  };
}

module.exports = new AgendamentosController();
