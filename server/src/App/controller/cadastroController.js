const Cadastros = require("../model/cadastro");

class CadastrosController {
  criarServico = (req, res) => {
    const { servico } = req.body;

    Cadastros.criarServicos({servico})
      .then(() => {
        res.status(201).json({ mensagem: 'Servico Cadastrado com sucesso!' });
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ erro: 'Erro ao salvar no banco.' });
      });
  };

  criarHorario = (req, res) => {
    const { horario } = req.body;

    Cadastros.criarHorarios({horario})
      .then(() => {
        res.status(201).json({ mensagem: 'Horario Cadastrado com sucesso!' });
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ erro: 'Erro ao salvar no banco.' });
      });
  };

   criarPrecos = (req, res) => {
    const { preco, id_servico } = req.body;

    Cadastros.criarPreco({preco, id_servico})
      .then(() => {
        res.status(201).json({ mensagem: 'Preco Cadastrado com sucesso!' });
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ erro: 'Erro ao salvar no banco.' });
      });
  };

}

module.exports = new CadastrosController();
