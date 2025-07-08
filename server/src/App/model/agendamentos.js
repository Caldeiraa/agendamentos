const mysql = require("mysql2");
const dbConfig = require("../config.js");

class Agendamento {
  constructor() {
    this.conexao = mysql.createConnection(dbConfig.db);
  }

  criar(dados) {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO agendamento_servico (nome_cliente, data, id_horario, id_servico)
        VALUES (?, ?, ?, ?)
      `;
      const valores = [
        dados.nome_cliente,
        dados.data,
        dados.horario,   // ID do horário
        dados.servicos   // ID do serviço
      ];

      this.conexao.query(query, valores, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }

  listarTodos() {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT 
          a.id_agendamentos,
          a.nome_cliente,
          a.data,
          h.horario,
          s.servico
        FROM agendamento_servico a
        JOIN horarios_disponiveis h ON a.id_horario = h.id_horario
        JOIN servicos s ON a.id_servico = s.id_servicos
      `;
      this.conexao.query(query, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  listarHorariosDisponiveisPorData(data) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT h.id_horario, h.horario
        FROM horarios_disponiveis h
        WHERE h.id_horario NOT IN (
          SELECT a.id_horario
          FROM agendamento_servico a
          WHERE a.data = ?
        )
      `;
      this.conexao.query(query, [data], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  listarTodosHorarios() {
    return new Promise((resolve, reject) => {
      this.conexao.query('SELECT * FROM horarios_disponiveis', (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  listarCortes() {
    return new Promise((resolve, reject) => {
      this.conexao.query('SELECT * FROM servicos', (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }
}

module.exports = new Agendamento();
