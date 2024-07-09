const { db } = require("../database/connection")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

let blacklist = [];

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)

    const result = await db.oneOrNone('SELECT * FROM usuario WHERE email = $1', [email])

    if (result) {
      return res.status(400).json({ title: 'Erro', description: 'O usuário já existe' })
    }

    await db.none('INSERT INTO usuario (nome, email, tipo, senha) VALUES ($1, $2, $3, $4)', [name, email, 'Funcionário', hashedPassword])
    res.status(201).json({ title: 'Sucesso', description: 'Usuário registrado com sucesso' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ title: 'Erro', description: 'Erro ao registrar usuário' })
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await db.oneOrNone('SELECT * FROM usuario WHERE email = $1', [email])

    if (!user) {
      return res.status(400).json({ title: 'Erro', description: 'Credenciais incorretas' })
    }

    const isPasswordValid = await bcrypt.compare(password, user.senha)

    if (!isPasswordValid) {
      return res.status(400).json({ title: 'Erro', description: 'Credenciais incorretas' })
    }

    const jwt_secret = process.env.JWT_SECRET

    const token = jwt.sign({ email: user.email, name: user.nome, type: user.tipo }, jwt_secret, { expiresIn: '1h' })
    res.status(200).json({ title: 'Sucesso', description: 'Usuário logado com sucesso', token: token })
  } catch (error) {
    console.error(error)
    res.status(500).json({ title: 'Erro', description: 'Erro ao se autenticar' })
  }
}

exports.logout = async (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ title: 'Erro', description: 'Token não fornecido' });
  }

  blacklist.push(token);
  res.status(200).json({ title: 'Sucesso', description: 'Logout realizado com sucesso' });
};

exports.delete = async (req, res) => {
  try {
    const { email, password } = req.body

    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ title: 'Erro', description: 'Token não fornecido' })
    }

    const user = await db.oneOrNone('SELECT * FROM usuario WHERE email = $1', [email])

    if (!user) {
      return res.status(400).json({ title: 'Erro', description: 'Usuário não condiz com nenhum do banco de dados.' })
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.senha)

    if (!isPasswordValid) {
      return res.status(400).json({ title: 'Erro', description: 'Credenciais incorretas' })
    }
    
    await db.none('delete from usuario where email = $1)', [email])
    res.status(201).json({ title: 'Sucesso', description: 'Usuário deletado com sucesso' })
    blacklist.push(token);
    
  } catch (error) {
    res.status(500).json({ title: 'Erro', description: 'Erro ao deletar usuário' })
  }
  
}

exports.blacklist = blacklist;
