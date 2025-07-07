const express = require('express');
const routes = express.Router();

const Agendamento = require("../src/App/controller/agendamentosController");

routes.post('/agendamento',Agendamento.criarAgendamento);

routes.get('/agendamentos',Agendamento.obterAgendamentos);
routes.get('/horarios',Agendamento.obterHorariosDis);
routes.get('/servicos',Agendamento.obterCortes);
<<<<<<< HEAD
routes.get('/horarios-dis',Agendamento.obterHorariosPorData)
=======

>>>>>>> 054ac04000930f9c319adac57cc65b2c20b09541
module.exports = routes;
