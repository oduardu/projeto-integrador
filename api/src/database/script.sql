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
