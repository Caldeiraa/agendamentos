const express = require('express');
const routes = express.Router();

const Agendamento = require("../src/App/controller/agendamentosController");

routes.post('/agendamentos',Agendamento.criarAgendamento);
routes.get('/agendamentos',Agendamento.obterAgendamentos);

module.exports = routes;
