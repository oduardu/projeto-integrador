const { db } = require("../database/connection")

exports.addClient = async (req, res) => {
    const { cpf, cnpj, name, street, number, city, state, phone, email } = req.body;

    if (!cpf && !cnpj) {
        return res.status(400).json({
            title: 'Erro:',
            description: 'O campo CPF ou CNPJ precisa ser preenchido'
        });
    }

    try {
        await db.none('INSERT INTO cliente (cpf, cnpj, nome, rua, numero, cidade, estado, telefone, email) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)', 
            [cpf, cnpj, name, street, number, city, state, phone, email]);

        res.status(201).json({title: 'Sucesso', description: 'Cliente cadastrado com sucesso'
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            title: 'error',
            description: 'Erro ao cadastrar cliente'
        });
    }
};

// READ
exports.getAllClients = async (req, res) => {
    try {
        const clients = await db.any('SELECT * FROM cliente');
        res.status(200).json(clients);
    } catch (error) {
        console.error('Erro ao listar todos os clientes:', error);
        res.status(500).json({ message: 'Erro ao listar todos os clientes' });
    }
};

exports.getClientByName = async (req, res) => {
    const { name } = req.query;
    try {
        const clients = await db.any('SELECT * FROM cliente WHERE nome ILIKE $1', [`%${name}%`]);
        res.status(200).json(clients);
    } catch (error) {
        console.error('Erro ao listar clientes por nome:', error);
        res.status(500).json({ message: 'Erro ao listar clientes por nome' });
    }
};

exports.updateClient = async (req, res) => {
    const identifier = req.params.identifier; 

    try {
        const existentClient = await db.oneOrNone('SELECT * FROM cliente WHERE cpf = $1 OR cnpj = $1', identifier);

        const updatedClient = {
            name: req.body.name || existentClient.nome,
            email: req.body.email || existentClient.email, 
            phone: req.body.phone || existentClient.telefone,
            street: req.body.street || existentClient.rua,
            number: req.body.number || existentClient.numero,
            city: req.body.city || existentClient.cidade,
            state: req.body.state || existentClient.estado
        };

        await db.none('UPDATE cliente SET nome = $1, telefone = $2, rua = $3, numero = $4, cidade = $5, estado = $6, email = $7 WHERE cpf = $8 OR cnpj = $8',
            [updatedClient.name, updatedClient.phone, updatedClient.street, updatedClient.number, updatedClient.city, updatedClient.state, novoCliente.email, identifier]);

        res.status(200).json({ title: 'Sucesso', description: 'Cliente atualizado com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar cliente:', error);
        res.status(500).json({title: 'Sucesso', description: 'Erro ao atualizar cliente' });
    }
};

// DELETE
exports.deleteClient = async (req, res) => {
    const identifier = req.params.identifier; 

    try {
        await db.none('DELETE FROM cliente WHERE cpf = $1 OR cnpj = $1', identifier);
        res.status(200).json({ title: 'Sucesso', description: 'Cliente removido com sucesso' });
    } catch (error) {
        console.error('Erro ao remover cliente:', error);
        res.status(500).json({ title: 'Sucesso', description: 'Erro ao remover cliente' });
    }
};