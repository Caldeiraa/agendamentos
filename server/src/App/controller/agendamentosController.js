const Agendamento = require("../model/agendamentos");

class AgendamentosController {
<<<<<<< HEAD

=======
  
>>>>>>> 054ac04000930f9c319adac57cc65b2c20b09541
  criarAgendamento = (req, res) => {
    const { nome_cliente, data, horario, servicos } = req.body;

    if (!nome_cliente || !data || !horario || !servicos) {
      return res.status(400).json({ erro: 'Preencha todos os campos.' });
    }

<<<<<<< HEAD
    Agendamento.criar({ nome_cliente, data, id_horario: horario, id_servico: servicos })
=======
    Agendamento.criar({ nome_cliente, data, horario, servicos })
>>>>>>> 054ac04000930f9c319adac57cc65b2c20b09541
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
<<<<<<< HEAD
        res.status(500).json({ erro: 'Erro ao buscar horários.' });
=======
        res.status(500).json({ erro: 'Erro ao buscar agendamentos.' });
>>>>>>> 054ac04000930f9c319adac57cc65b2c20b09541
      });
  };

  obterCortes = (req, res) => {
    Agendamento.listarCortes()
      .then(resultados => {
        res.status(200).json(resultados);
      })
      .catch(err => {
        console.error(err);
<<<<<<< HEAD
        res.status(500).json({ erro: 'Erro ao buscar serviços.' });
      });
  };

  // ✅ Novo método para pegar horários disponíveis por data
  obterHorariosPorData = (req, res) => {
    const { data } = req.query;
    
    if (!data) {
      return res.status(400).json({ erro: "Informe a data no formato YYYY-MM-DD." });
    }

    Agendamento.listarHorariosDisponiveisPorData(data)
      .then(horarios => {
        res.status(200).json(horarios);
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ erro: "Erro ao buscar horários disponíveis." });
=======
        res.status(500).json({ erro: 'Erro ao buscar agendamentos.' });
>>>>>>> 054ac04000930f9c319adac57cc65b2c20b09541
      });
  };
}

module.exports = new AgendamentosController();
