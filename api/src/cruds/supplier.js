const { db } = require("../database/connection")

exports.addSupplier = async (req, res) => {
    const { cnpj, name, street, district, number, city, state } = req.body;

    try {
        await db.none('INSERT INTO fornecedor (cnpj, nome, rua, bairro, numero, cidade, estado) VALUES ($1, $2, $3, $4, $5, $6, $7)', 
            [cnpj, name, street, district, number, city, state]);

        res.status(201).json({title: 'Sucesso', description: 'Fornecedor cadastrado com sucesso'});

    } catch (error) {
        console.error(error);
        res.status(500).json({ title: 'Erro', description: 'Erro ao cadastrar produto'});
    }
};

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
    let identifier = req.params.identifier;

    identifier = identifier.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');

    const { cnpj, name, street, district, number, city, state } = req.body;

    try {
        await db.none('UPDATE fornecedor SET cnpj = $1, nome = $2, rua = $3, bairro = $4, numero = $5, cidade = $6, estado = $7 WHERE cnpj = $8;',
            [cnpj, name, street, district, number, city, state, identifier]);

        res.status(200).json({ title: 'Sucesso', description: 'Fornecedor atualizado com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar fornecedor:', error);
        res.status(500).json({ title: 'Erro', description: 'Erro ao atualizar fornecedor' });
    }
};

exports.deleteSupplier = async (req, res) => {
    let identifier = req.params.identifier;

    identifier = identifier.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
    
    try {
        await db.none('DELETE FROM fornecedor WHERE cnpj = $1', identifier);
        res.status(200).json({ title: 'Sucesso', description: 'Fornecedor removido com sucesso' });
    } catch (error) {
        console.error('Erro ao remover fornecedor:', error);
        res.status(500).json({ title: 'Erro', description: 'Erro ao remover fornecedor' });
    }
};