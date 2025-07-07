const mysql = require("mysql2")
const dbConfig = require("../config.js")

class Agendamento {
  constructor() {
    this.conexao = mysql.createConnection(dbConfig.db)
  }

  criar(dados) {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO agendamento_servico (nome_cliente,data, id_horario,id_servico)
        VALUES (?, ?, ?, ?)
      `;
      const valores = [
        dados.nome_cliente,
        dados.data,
        dados.horario,
        dados.servicos,
      ];

      this.conexao.query(query, valores, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }

  listarTodos() {
    return new Promise((resolve, reject) => {
      this.conexao.query(`SELECT 
  a.id_agendamentos,
  a.nome_cliente,
  a.data,
  h.horario,
  s.servico
FROM agendamento_servico a
JOIN horarios_disponiveis h ON a.id_horario = h.id_horario
JOIN servicos s ON a.id_servico = s.id_servicos;`
        , (err, results) => {
          if (err) return reject(err);
          resolve(results);
        });
    });
  }
  listarHorariosDisponiveis() {
    return new Promise((resolve, reject) => {
      this.conexao.query('SELECT * FROM horarios_disponiveis;', (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  listarCortes() {
    return new Promise((resolve, reject) => {
      this.conexao.query('SELECT * FROM servicos;', (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

}

module.exports = new Agendamento()
