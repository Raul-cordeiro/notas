-- Cria o banco, só se não existir
CREATE DATABASE IF NOT EXISTS lucasdb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Usa o banco
USE lucasdb;

-- Cria a tabela notas_fiscais (corrigindo o nome e campos)
CREATE TABLE IF NOT EXISTS notas_fiscais (
  id INT AUTO_INCREMENT PRIMARY KEY,
  numero VARCHAR(50) NOT NULL,
  empresa VARCHAR(100) NOT NULL,
  vencimento DATE NOT NULL,
  valor_nota DECIMAL(10,2) NOT NULL,
  tipo_nota ENUM('pagar', 'receber') NOT NULL
);

-- Exemplo de inserção pra testar
INSERT INTO notas_fiscais (numero, empresa, vencimento, valor_nota, tipo_nota) VALUES
('1234', 'Empresa A', '2025-07-10', 1500.00, 'pagar'),
('5678', 'Empresa B', '2025-07-15', 2500.50, 'receber'),
('9012', 'Empresa C', '2025-08-01', 3000.75, 'pagar');
