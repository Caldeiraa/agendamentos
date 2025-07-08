const Agendamento = require("../model/agendamentos");

class AgendamentosController {
  criarAgendamento = (req, res) => {
    const { nome_cliente, data, horario, servicos } = req.body;

    if (!nome_cliente || !data || !horario || !servicos) {
      return res.status(400).json({ erro: 'Preencha todos os campos.' });
    }

    const diaSemana = new Date(data).getDay(); // 0 = domingo, 1 = segunda
    if (diaSemana === 0 || diaSemana === 1) {
      return res.status(400).json({ erro: "Não é possível agendar em domingos ou segundas-feiras." });
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
    Agendamento.listarTodosHorarios()
      .then(resultados => {
        res.status(200).json(resultados);
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ erro: 'Erro ao buscar horários.' });
      });
  };

  obterHorariosPorData = (req, res) => {
  const { data } = req.query;

  if (!data) {
    return res.status(400).json({ erro: "Informe a data no formato YYYY-MM-DD." });
  }

  const dataConvertida = new Date(`${data}T00:00:00`);

  if (isNaN(dataConvertida.getTime())) {
    return res.status(400).json({ erro: "Data inválida." });
  }

  const diaSemana = dataConvertida.getDay();

  if (diaSemana === 0 || diaSemana === 1) {
    return res.status(400).json({ erro: "Domingo e segunda indisponíveis." });
  }

  Agendamento.listarHorariosDisponiveisPorData(data)
    .then(horarios => {
      res.status(200).json(horarios);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ erro: "Erro ao buscar horários disponíveis." });
    });
};

  obterCortes = (req, res) => {
    Agendamento.listarCortes()
      .then(resultados => {
        res.status(200).json(resultados);
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ erro: 'Erro ao buscar serviços.' });
      });
  };
}

module.exports = new AgendamentosController();
