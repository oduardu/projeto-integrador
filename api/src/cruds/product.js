const { db } = require("../database/connection")

exports.addProduct = async (req, res) => {
    const { code, name, description, stock } = req.body;

    try {
        await db.none('INSERT INTO produto (codigo, nome, descricao, quantidade_estoque) VALUES ($1, $2, $3, $4)', 
            [code, name, description, stock]);

        res.status(201).json({title: 'Sucesso', description: 'Produto cadastrado com sucesso'
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ title: 'Erro', description: 'Erro ao cadastrar produto'});
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const products = await db.any('SELECT * FROM produto');
        res.status(200).json(products);
    } catch (error) {
        console.error('Erro ao listar todos os produtos:', error);
        res.status(500).json({ title: 'Erro', description: 'Erro ao listar todos os produtos' });
    }
};

exports.updateProduct = async (req, res) => {
    const identifier = req.params.identifier; 

    try {
        const existentProduct = await db.oneOrNone('SELECT * FROM produto WHERE codigo = $1', identifier);

        const newProduct = {
            name: req.body.name || existentProduct.nome,
            description: req.body.description || existentProduct.descricao,
            stock: req.body.city || existentProduct.quantidade_estoque,
        };

        await db.none('UPDATE produto SET nome = $1, descricao = $2, quantidade_estoque = $3, WHERE code = $4',
            [newProduct.name, newProduct.description, newProduct.stock, identifier]);

        res.status(200).json({ title: 'Sucesso', description: 'Cliente atualizado com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar cliente:', error);
        res.status(500).json({title: 'Erro', description: 'Erro ao atualizar cliente' });
    }
};

exports.deleteProduct = async (req, res) => {
    const identifier = req.params.identifier; 

    try {
        await db.none('DELETE FROM produto WHERE codigo = $1', identifier);
        res.status(200).json({ title: 'Sucesso', description: 'Produto removido com sucesso' });
    } catch (error) {
        console.error('Erro ao remover produto:', error);
        res.status(500).json({ title: 'Erro', description: 'Erro ao remover produto' });
    }
};