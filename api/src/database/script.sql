CREATE TABLE fornecedor (
    cnpj VARCHAR(18) PRIMARY KEY NOT NULL,
    nome VARCHAR(100) NOT NULL,
    rua VARCHAR(100) NOT NULL,
    numero VARCHAR(10) NOT NULL,
    cidade VARCHAR(50) NOT NULL,
    estado VARCHAR(2) NOT NULL
);

CREATE TABLE uva (
    id INTEGER PRIMARY KEY,
    dataRecebimento DATE NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    quantidadeEstoque NUMERIC(10, 2) NOT NULL,
    fornecedorCnpj VARCHAR(18) NOT NULL,

    FOREIGN KEY (fornecedorCnpj) REFERENCES fornecedor(cnpj)
);

CREATE TABLE vinho (
    id INTEGER PRIMARY KEY,
    inicioFermentacao DATE NOT NULL,
    lote VARCHAR(50) NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    litrosEstoque NUMERIC(10, 2) NOT NULL
);

CREATE TABLE insumo (
    id INTEGER PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    quantidadeEstoque NUMERIC(10, 2) NOT NULL
);

CREATE TABLE vinhoUva (
    idUva INTEGER NOT NULL,
    idVinho INTEGER NOT NULL,

    FOREIGN KEY (idUva) REFERENCES uva(id),
    FOREIGN KEY (idVinho) REFERENCES vinho(id),
    PRIMARY KEY (idUva, idVinho)
);

CREATE TABLE vinhoInsumo (
    idInsumo INTEGER NOT NULL,
    idVinho INTEGER NOT NULL,

    FOREIGN KEY (idInsumo) REFERENCES insumo(id),
    FOREIGN KEY (idVinho) REFERENCES vinho(id),
    PRIMARY KEY (idInsumo, idVinho)
);

CREATE TABLE garrafa (
    codigo VARCHAR(50) PRIMARY KEY NOT NULL,
    capacidade VARCHAR(30) NOT NULL,
    quantidadeEstoque INTEGER NOT NULL,
    vinhoArmazenado INTEGER,

    FOREIGN KEY (vinhoArmazenado) REFERENCES vinho(id)
);

CREATE TABLE produto (
    codigo VARCHAR(50) PRIMARY KEY NOT NULL,
    nome VARCHAR(60) NOT NULL,
    descricao VARCHAR(100) NOT NULL,
    quantidadeEstoque INTEGER NOT NULL
);

CREATE TABLE garrafaProduto (
    codigoGarrafa VARCHAR(50) NOT NULL,
    codigoProduto VARCHAR(50) NOT NULL,
    PRIMARY KEY (codigoGarrafa, codigoProduto),
    FOREIGN KEY (codigoGarrafa) REFERENCES garrafa(codigo),
    FOREIGN KEY (codigoProduto) REFERENCES produto(codigo)
);

CREATE TABLE historicoProduto (
    data DATE NOT NULL,
    hora TIME NOT NULL,
    preco NUMERIC(10, 2) NOT NULL,
    estoque INTEGER NOT NULL,
    produto VARCHAR(50) NOT NULL,

    PRIMARY KEY (data, hora),
    FOREIGN KEY (produto) REFERENCES produto(codigo)
);

CREATE TABLE pedido (
    id INTEGER PRIMARY KEY,
    data DATE NOT NULL,
    clienteFisico VARCHAR(14),
    clienteJuridico VARCHAR(18),
    usuarioFatura VARCHAR(60),

    FOREIGN KEY (clienteFisico) REFERENCES cliente(cpf),
    FOREIGN KEY (clienteJuridico) REFERENCES cliente(cnpj),
    FOREIGN KEY (usuarioFatura) REFERENCES usuario(email)
);

CREATE TABLE produtoPedido (
    codigoProduto VARCHAR(50) NOT NULL,
    idPedido INTEGER NOT NULL,

    PRIMARY KEY (codigoProduto, idPedido),
    FOREIGN KEY (codigoProduto) REFERENCES produto(codigo),
    FOREIGN KEY (idPedido) REFERENCES pedido(id)
);

CREATE TABLE cliente (
    cpf VARCHAR(14),
    cnpj VARCHAR(18),
    nome VARCHAR(50) NOT NULL,
    rua VARCHAR(100) NOT NULL,
    numero VARCHAR(10) NOT NULL,
    cidade VARCHAR(50) NOT NULL,
    estado VARCHAR(2) NOT NULL,

    PRIMARY KEY (cpf, cnpj)
);

CREATE TABLE usuario (
    email VARCHAR(60) NOT NULL,
    nome VARCHAR(50) NOT NULL,
    tipo VARCHAR(30) NOT NULL,

    PRIMARY KEY (email)
);

CREATE TABLE etapaProducao (
    id INTEGER PRIMARY KEY,
    nome VARCHAR(30) NOT NULL,
    descricao VARCHAR(100) NOT NULL,
    data DATE NOT NULL,
    usuarioRealizou VARCHAR(60),

    FOREIGN KEY (usuarioRealizou) REFERENCES usuario(email)
);
