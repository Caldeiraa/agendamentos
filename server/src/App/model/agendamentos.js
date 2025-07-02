import db from '../database.js';

class AgendamentoModel {
  static criar(dados) {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO agendamento_servico (nome_cliente, data, horario, servicos)
        VALUES (?, ?, ?, ?)
      `;
      const valores = [
        dados.nome_cliente,
        dados.data,
        dados.horario,
        dados.servicos,
      ];

      db.query(query, valores, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }

  static listarTodos() {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM agendamento_servico ORDER BY data ASC', (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }
}

export default AgendamentoModel;
