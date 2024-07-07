const { db } = require("../database/connection")

exports.addClient = async (req, res) => {
    const { cpf, cnpj, name, street, number, city, state, phone } = req.body;

    if (!cpf && !cnpj) {
        return res.status(400).json({
            title: 'Erro:',
            description: 'O campo CPF ou CNPJ precisa ser preenchido'
        });
    }

    try {
        await db.none('INSERT INTO cliente (cpf, cnpj, nome, rua, numero, cidade, estado, telefone) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', 
            [cpf, cnpj, name, street, number, city, state, phone]);

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
        const clienteExistente = await db.oneOrNone('SELECT * FROM cliente WHERE cpf = $1 OR cnpj = $1', identifier);

        const novoCliente = {
            name: req.body.name || clienteExistente.nome,
            phone: req.body.phone || clienteExistente.telefone,
            street: req.body.street || clienteExistente.rua,
            number: req.body.number || clienteExistente.numero,
            city: req.body.city || clienteExistente.cidade,
            state: req.body.state || clienteExistente.estado
        };

        await db.none('UPDATE cliente SET nome = $1, telefone = $2, rua = $3, numero = $4, cidade = $5, estado = $6 WHERE cpf = $7 OR cnpj = $7',
            [novoCliente.name, novoCliente.phone, novoCliente.street, novoCliente.number, novoCliente.city, novoCliente.state, identifier]);

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