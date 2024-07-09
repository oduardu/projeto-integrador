CREATE TABLE fornecedor (
    cnpj VARCHAR(18) PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    rua VARCHAR(60) NOT NULL,
    bairro VARCHAR(50) NOT NULL,
    numero VARCHAR(10) NOT NULL,
    cidade VARCHAR(50) NOT NULL,
    estado VARCHAR(2) NOT NULL
);

CREATE TABLE uva (
    id SERIAL PRIMARY KEY,
    data_recebimento DATE NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    quantidade_estoque NUMERIC(10, 2) NOT NULL,
    fornecedor_cnpj VARCHAR(18) NOT NULL,

    FOREIGN KEY (fornecedor_cnpj) REFERENCES fornecedor(cnpj)
);

CREATE TABLE vinho (
    id SERIAL PRIMARY KEY,
    inicio_fermentacao DATE NOT NULL,
    lote VARCHAR(50) NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    litros_estoque NUMERIC(10, 2) NOT NULL
);

CREATE TABLE insumo (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    quantidade_estoque NUMERIC(10, 2) NOT NULL
);

CREATE TABLE vinho_uva (
    id_uva INTEGER,
    id_vinho INTEGER,

    FOREIGN KEY (id_uva) REFERENCES uva(id),
    FOREIGN KEY (id_vinho) REFERENCES vinho(id),
    PRIMARY KEY (id_uva, id_vinho)
);

CREATE TABLE vinho_insumo (
    id_insumo INTEGER,
    id_vinho INTEGER,

    FOREIGN KEY (id_insumo) REFERENCES insumo(id),
    FOREIGN KEY (id_vinho) REFERENCES vinho(id),
    PRIMARY KEY (id_insumo, id_vinho)
);

CREATE TABLE garrafa (
    codigo VARCHAR(50) PRIMARY KEY,
    capacidade VARCHAR(30) NOT NULL,
    quantidade_estoque INTEGER NOT NULL,
    vinho_armazenado INTEGER,

    FOREIGN KEY (vinho_armazenado) REFERENCES vinho(id)
);

CREATE TABLE produto (
    codigo VARCHAR(50) PRIMARY KEY,
    nome VARCHAR(60) NOT NULL,
    descricao VARCHAR(100) NOT NULL,
    quantidade_estoque INTEGER NOT NULL
);

CREATE TABLE garrafa_produto (
    codigo_garrafa VARCHAR(50) NOT NULL,
    codigo_produto VARCHAR(50) NOT NULL,
    PRIMARY KEY (codigo_garrafa, codigo_produto),
    FOREIGN KEY (codigo_garrafa) REFERENCES garrafa(codigo),
    FOREIGN KEY (codigo_produto) REFERENCES produto(codigo)
);

CREATE TABLE historico_produto (
    data DATE,
    hora TIME,
    preco NUMERIC(10, 2) NOT NULL,
    estoque INTEGER NOT NULL,
    produto VARCHAR(50) NOT NULL,

    PRIMARY KEY (data, hora),
    FOREIGN KEY (produto) REFERENCES produto(codigo)
);

CREATE TABLE cliente (
    id SERIAL PRIMARY KEY,
    cpf VARCHAR(14) UNIQUE,
    cnpj VARCHAR(18) UNIQUE,
    nome VARCHAR(50) NOT NULL,
    email VARCHAR(60) NOT NULL,
    telefone BIGINT NOT NULL,
    rua VARCHAR(60) NOT NULL,
    bairro VARCHAR(50) NOT NULL,
    numero INTEGER NOT NULL,
    cidade VARCHAR(50) NOT NULL,
    estado VARCHAR(2) NOT NULL,
    CHECK ((cpf IS NOT NULL AND cnpj IS NULL) OR (cpf IS NULL AND cnpj IS NOT NULL))
);

CREATE TABLE usuario (
    email VARCHAR(50) PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    tipo VARCHAR(13) NOT NULL,
    senha VARCHAR(60) NOT NULL
);

CREATE TABLE pedido (
    id SERIAL PRIMARY KEY,
    data DATE NOT NULL,
    cliente_id INTEGER NOT NULL,
    usuario_fatura VARCHAR(60) NOT NULL,
    
    FOREIGN KEY (cliente_id) REFERENCES cliente(id),
    FOREIGN KEY (usuario_fatura) REFERENCES usuario(email)
);

CREATE TABLE produto_pedido (
    codigo_produto VARCHAR(50),
    id_pedido INTEGER,

    PRIMARY KEY (codigo_produto, id_pedido),
    FOREIGN KEY (codigo_produto) REFERENCES produto(codigo),
    FOREIGN KEY (id_pedido) REFERENCES pedido(id)
);

CREATE TABLE etapa_producao (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(30) NOT NULL,
    descricao VARCHAR(100) NOT NULL,
    data DATE NOT NULL,
    usuario_realizou VARCHAR(60),

    FOREIGN KEY (usuario_realizou) REFERENCES usuario(email)
);

INSERT INTO cliente (cpf, cnpj, nome, email, telefone, rua, bairro, numero, cidade, estado)
VALUES
('123.456.789-00', NULL, 'Cliente 1', 'cliente1@example.com', 12345678901, 'Rua A', 'Bairro A', 1, 'Cidade A', 'SC'),
('987.654.321-00', NULL, 'Cliente 2', 'cliente2@example.com', 23456789012, 'Rua B', 'Bairro B', 2, 'Cidade B', 'PB'),
(NULL, '12.345.678/0001-00', 'Cliente 3', 'cliente3@example.com', 34567890123, 'Rua C', 'Bairro C', 3, 'Cidade C', 'CE'),
('111.222.333-44', NULL, 'Cliente 4', 'cliente4@example.com', 45678901234, 'Rua D', 'Bairro D', 4, 'Cidade D', 'PR'),
(NULL, '98.765.432/0001-99', 'Cliente 5', 'cliente5@example.com', 56789012345, 'Rua E', 'Bairro E', 5, 'Cidade E', 'SP');

INSERT INTO fornecedor (cnpj, nome, rua, bairro, numero, cidade, estado)
VALUES  
('12.345.678/0001-00', 'Fornecedor 1', 'Rua F', 'Bairro F', '10', 'Cidade F', 'SC'),
('23.456.789/0001-11', 'Fornecedor 2', 'Rua G', 'Bairro G', '20', 'Cidade G', 'PB'),
('34.567.890/0001-22', 'Fornecedor 3', 'Rua H', 'Bairro H', '30', 'Cidade H', 'CE'),
('45.678.901/0001-33', 'Fornecedor 4', 'Rua I', 'Bairro I', '40', 'Cidade I', 'PR'),
('56.789.012/0001-44', 'Fornecedor 5', 'Rua J', 'Bairro J', '50', 'Cidade J', 'SP');

INSERT INTO produto (codigo, nome, descricao, quantidade_estoque)
VALUES
('PROD001', 'Produto 1', 'Descrição do Produto 1', 100),
('PROD002', 'Produto 2', 'Descrição do Produto 2', 200),
('PROD003', 'Produto 3', 'Descrição do Produto 3', 300),
('PROD004', 'Produto 4', 'Descrição do Produto 4', 400),
('PROD005', 'Produto 5', 'Descrição do Produto 5', 500);

INSERT INTO uva (data_recebimento, tipo, quantidade_estoque, fornecedor_cnpj)
VALUES
('2024-01-01', 'Uva 1', 100.50, '12.345.678/0001-00'),
('2024-02-01', 'Uva 2', 200.75, '23.456.789/0001-11'),
('2024-03-01', 'Uva 3', 300.25, '34.567.890/0001-22'),
('2024-04-01', 'Uva 4', 400.00, '45.678.901/0001-33'),
('2024-05-01', 'Uva 5', 500.80, '56.789.012/0001-44');

INSERT INTO vinho (inicio_fermentacao, lote, tipo, litros_estoque)
VALUES
('2024-01-01', 'Lote 1', 'Vinho Tinto', 1000.50),
('2024-02-01', 'Lote 2', 'Vinho Branco', 2000.75),
('2024-03-01', 'Lote 3', 'Vinho Rosé', 3000.25),
('2024-04-01', 'Lote 4', 'Vinho Espumante', 4000.00),
('2024-05-01', 'Lote 5', 'Vinho Doce', 5000.80);

INSERT INTO insumo (nome, tipo, quantidade_estoque)
VALUES
('Insumo 1', 'Tipo A', 100.50),
('Insumo 2', 'Tipo B', 200.75),
('Insumo 3', 'Tipo C', 300.25),
('Insumo 4', 'Tipo D', 400.00),
('Insumo 5', 'Tipo E', 500.80);

INSERT INTO vinho_uva (id_uva, id_vinho)
VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5);

INSERT INTO vinho_insumo (id_insumo, id_vinho)
VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5);

INSERT INTO garrafa (codigo, capacidade, quantidade_estoque, vinho_armazenado)
VALUES
('GARRAFA001', '750ml', 100, 1),
('GARRAFA002', '1L', 200, 2),
('GARRAFA003', '500ml', 300, 3),
('GARRAFA004', '375ml', 400, 4),
('GARRAFA005', '1.5L', 500, 5);

INSERT INTO garrafa_produto (codigo_garrafa, codigo_produto)
VALUES
('GARRAFA001', 'PROD001'),
('GARRAFA002', 'PROD002'),
('GARRAFA003', 'PROD003'),
('GARRAFA004', 'PROD004'),
('GARRAFA005', 'PROD005');

INSERT INTO historico_produto (data, hora, preco, estoque, produto)
VALUES
('2024-01-01', '10:00:00', 10.50, 100, 'PROD001'),
('2024-02-01', '11:00:00', 20.75, 200, 'PROD002'),
('2024-03-01', '12:00:00', 30.25, 300, 'PROD003'),
('2024-04-01', '13:00:00', 40.00, 400, 'PROD004'),
('2024-05-01', '14:00:00', 50.80, 500, 'PROD005');

INSERT INTO pedido (data, cliente_id, usuario_fatura)
VALUES
('2024-01-01', 1, 'usuario1@example.com'),
('2024-02-01', 2, 'usuario2@example.com'),
('2024-03-01', 3, 'usuario3@example.com'),
('2024-04-01', 4, 'usuario4@example.com'),
('2024-05-01', 5, 'usuario5@example.com');

INSERT INTO produto_pedido (codigo_produto, id_pedido)
VALUES
('PROD001', 1),
('PROD002', 2),
('PROD003', 3),
('PROD004', 4),     
('PROD005', 5);

INSERT INTO etapa_producao (nome, descricao, data, usuario_realizou)
VALUES
('Etapa 1', 'Descrição da Etapa 1', '2024-01-01', 'usuario1@example.com'),
('Etapa 2', 'Descrição da Etapa 2', '2024-02-01', 'usuario2@example.com'),
('Etapa 3', 'Descrição da Etapa 3', '2024-03-01', 'usuario3@example.com'),
('Etapa 4', 'Descrição da Etapa 4', '2024-04-01', 'usuario4@example.com'),
('Etapa 5', 'Descrição da Etapa 5', '2024-05-01', 'usuario5@example.com');

