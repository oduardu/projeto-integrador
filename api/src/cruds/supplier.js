const { db } = require("../database/connection")

exports.addSupplier = async (req, res) => {
    const { cnpj, name, street, number, city, state } = req.body;

    try {
        await db.none('INSERT INTO fornecedor (cnpj, nome, rua, numero, cidade, estado) VALUES ($1, $2, $3, $4, $5, $6)', 
            [cnpj, name, street, number, city, state]);

        res.status(201).json({title: 'Sucesso', description: 'Fornecedor cadastrado com sucesso'});

    } catch (error) {
        console.error(error);
        res.status(500).json({ title: 'Erro', description: 'Erro ao cadastrar produto'});
    }
};

// READ
exports.getAllSuppliers = async (req, res) => {
    try {
        const suppliers = await db.any('SELECT * FROM fornecedor');
        res.status(200).json(suppliers);
    } catch (error) {
        console.error('Erro ao listar todos os fornecedores:', error);
        res.status(500).json({ title: 'Erro', description: 'Erro ao listar todos os fornecedores' });
    }
};

exports.updateSupplier = async (req, res) => {
    const identifier = req.params.identifier;
    const {name, street, number, city, state} = req.body;

    try {

        await db.none('UPDATE fornecedor SET nome = $1, rua = $2, numero = $3, cidade = $4, estado = $5 WHERE cnpj = $6;',
            [name, street, number, city, state, identifier]);

        res.status(200).json({ title: 'Sucesso', description: 'Fornecedor atualizado com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar fornecedor:', error);
        res.status(500).json({title: 'Erro', description: 'Erro ao atualizar fornecedor' });
    }
};

exports.deleteSupplier = async (req, res) => {
    const identifier = req.params.identifier; 

    try {
        await db.none('DELETE FROM fornecedor WHERE cnpj = $1', identifier);
        res.status(200).json({ title: 'Sucesso', description: 'Fornecedor removido com sucesso' });
    } catch (error) {
        console.error('Erro ao remover fornecedor:', error);
        res.status(500).json({ title: 'Erro', description: 'Erro ao remover fornecedor' });
    }
};