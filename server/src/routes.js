const express = require('express');
const routes = express.Router();

const Agendamento = require("../src/App/controller/agendamentosController");
const Cadastro = require("../src/App/controller/cadastroController")

routes.post('/agendamento',Agendamento.criarAgendamento);
routes.post('/servico',Cadastro.criarServico)
routes.post('/horario',Cadastro.criarHorario)
routes.post('/precos',Cadastro.criarPrecos)

routes.get('/agendamentos',Agendamento.obterAgendamentos);
routes.get('/horarios',Agendamento.obterHorariosDis);
routes.get('/servicos',Agendamento.obterCortes);
routes.get('/horarios-dis',Agendamento.obterHorariosPorData)

module.exports = routes;
