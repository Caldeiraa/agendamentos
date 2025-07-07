const express = require('express');
const routes = express.Router();

const Agendamento = require("../src/App/controller/agendamentosController");

routes.post('/agendamento',Agendamento.criarAgendamento);

routes.get('/agendamentos',Agendamento.obterAgendamentos);
routes.get('/horarios',Agendamento.obterHorariosDis);
routes.get('/servicos',Agendamento.obterCortes);
routes.get('/horarios-dis',Agendamento.obterHorariosPorData)
module.exports = routes;
