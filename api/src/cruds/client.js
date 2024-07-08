const { db } = require("../database/connection")

exports.addClient = async (req, res) => {
    let { cpf, cnpj, name, street, number, city, state, phone, email } = req.body;

    if (cpf == "") {
        cpf = null;
    }
    if (cnpj == "") {
        cnpj = null;
    }

    try {
        await db.none('INSERT INTO cliente (cpf, cnpj, nome, rua, numero, cidade, estado, telefone, email) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)', 
            [cpf, cnpj, name, street, number, city, state, phone, email]);

        res.status(201).json({title: 'Sucesso', description: 'Cliente cadastrado com sucesso'});

    } catch (error) {
        console.error(error);
        res.status(500).json({ title: 'Erro', description: 'Erro ao cadastrar cliente'});
    }
};

exports.getAllClients = async (req, res) => {
    try {
        const clients = await db.any('SELECT * FROM cliente');
        res.status(200).json(clients);
    } catch (error) {
        console.error('Erro ao listar todos os clientes:', error);
        res.status(500).json({ title: 'Erro', description: 'Erro ao listar todos os clientes' });
    }
};

exports.updateClient = async (req, res) => {
    const identifier = req.params.identifier; 
    let {name, email, cnpj, cpf, phone, street, number, city, state} = req.body;

    if (cpf == "") {
        cpf = null;
    }
    if (cnpj == "") {
        cnpj = null;
    }

    try {

        await db.none('UPDATE cliente SET nome = $1, telefone = $2, cpf = $3, cnpj = $4 rua = $5, numero = $6, cidade = $7, estado = $8, email = $9 WHERE id = $10',
        [name, phone, cpf, cnpj, street, number, city, state, email, identifier]);

        res.status(200).json({ title: 'Sucesso', description: 'Cliente atualizado com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar cliente:', error);
        res.status(500).json({title: 'Erro', description: 'Erro ao atualizar cliente' });
    }
};

exports.deleteClient = async (req, res) => {
    const identifier = req.params.identifier; 

    try {
        await db.none('DELETE FROM cliente WHERE id = $1;', identifier);
        res.status(200).json({ title: 'Sucesso', description: 'Cliente removido com sucesso' });
    } catch (error) {
        console.error('Erro ao remover cliente:', error);
        res.status(500).json({ title: 'Erro', description: 'Erro ao remover cliente' });
    }
};