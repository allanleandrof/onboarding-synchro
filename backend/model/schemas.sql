CREATE DATABASE IF NOT EXISTS synchro;

USE synchro; 

-- Tabela contas_contabeis
CREATE TABLE contas_contabeis (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    codigo VARCHAR(20) NOT NULL UNIQUE,
    nome VARCHAR(250) NOT NULL,
    tipo ENUM('ATIVO', 'PASSIVO', 'RECEITA', 'DESPESA') NOT NULL,
    saldo DECIMAL(15,2) DEFAULT 0.00,
    ativo BOOLEAN NOT NULL DEFAULT TRUE,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_codigo (codigo),
    INDEX idx_tipo (tipo),
    INDEX idx_ativo (ativo)
);

-- Tabela historico_movimentacoes
CREATE TABLE historico_movimentacoes (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    conta_id CHAR(36) NOT NULL,
    operacao ENUM('CRIACAO', 'ALTERACAO') NOT NULL,
    descricao VARCHAR(500),
    valor_anterior DECIMAL(15,2),
    valor_novo DECIMAL(15,2),
    data_operacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (conta_id) REFERENCES contas_contabeis(id) ON DELETE CASCADE,
    
    INDEX idx_conta_id (conta_id),
    INDEX idx_operacao (operacao),
    INDEX idx_data_operacao (data_operacao)
);