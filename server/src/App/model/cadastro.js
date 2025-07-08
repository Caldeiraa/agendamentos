const mysql = require("mysql2");
const dbConfig = require("../config.js");

class Cadastro {
  constructor() {
    this.conexao = mysql.createConnection(dbConfig.db);
  }

  criarServicos(dados) {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO servicos (servico)
        VALUES (?)
      `;
      const valores = [  
        dados.servico  
      ];

      this.conexao.query(query, valores, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }

   criarHorarios(dados) {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO horarios_disponiveis (horario)
        VALUES (?)
      `;
      const valores = [  
        dados.horario  
      ];

      this.conexao.query(query, valores, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }

   criarPreco(dados) {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO preco (preco,id_servico)
        VALUES (?,?)
      `;
      const valores = [  
        dados.preco,
        dados.id_servico 
      ];

      this.conexao.query(query, valores, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }

}

module.exports = new Cadastro();
