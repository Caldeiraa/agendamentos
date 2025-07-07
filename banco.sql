-- Cria o banco
CREATE DATABASE IF NOT EXISTS agendamentos;
USE agendamentos;

-- Remove tabelas se já existirem (para rodar várias vezes)
DROP TABLE IF EXISTS agendamento_servico;
DROP TABLE IF EXISTS horarios_disponiveis;
DROP TABLE IF EXISTS servicos;

-- Tabela de horários disponíveis
CREATE TABLE horarios_disponiveis (
  id_horario INT PRIMARY KEY AUTO_INCREMENT,
  horario TIME NOT NULL UNIQUE
);

-- Tabela de serviços
CREATE TABLE servicos (
  id_servicos INT PRIMARY KEY AUTO_INCREMENT,
  servico VARCHAR(50) NOT NULL
);

-- Tabela de agendamento, com FK para horário e serviço
CREATE TABLE agendamento_servico (
  id_agendamentos INT PRIMARY KEY AUTO_INCREMENT,
  nome_cliente VARCHAR(50) NOT NULL,
  data DATE NOT NULL,
  id_horario INT NOT NULL,
  id_servico INT NOT NULL,
  FOREIGN KEY (id_horario) REFERENCES horarios_disponiveis(id_horario),
  FOREIGN KEY (id_servico) REFERENCES servicos(id_servicos)
);

-- Inserindo horários
INSERT INTO horarios_disponiveis (horario) VALUES 
  ('09:00'), ('10:00'), ('11:00'),
  ('13:00'), ('14:00'), ('15:00'),
  ('16:00'), ('17:00');

-- Inserindo serviços
INSERT INTO servicos (servico) VALUES 
  ('Maquina Cabelo - 30$'), ('Sombrancelha - 5$'), ('Barba - 10$'),
  ('Pezinho - 5$'), ('Luzes - 50$'), ('Reflexo - 60$'), ('Pigmentação - 20$'), ('Platinado - 70$');

-- Inserindo agendamento de exemplo (certifique-se que os IDs existam)
INSERT INTO agendamento_servico (nome_cliente, data, id_horario, id_servico) VALUES
  ('Caldeira', '2026-05-02', 1, 1);

-- SELECT com JOIN correto mostrando dados completos do agendamento
SELECT 
  a.id_agendamentos,
  a.nome_cliente,
  a.data,
  h.horario,
  s.servico
FROM agendamento_servico a
JOIN horarios_disponiveis h ON a.id_horario = h.id_horario
JOIN servicos s ON a.id_servico = s.id_servicos;
