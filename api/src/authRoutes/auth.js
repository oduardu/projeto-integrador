const { db } = require("../database/connection")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)

    const result = await db.oneOrNone('SELECT nome, email, senha FROM usuario WHERE email = $1', [email])

    if (result) {
      return res.status(400).json({ title: 'Erro', description: 'O usuário já existe' })
    }

    await db.none('INSERT INTO usuario (nome, email, senha) VALUES ($1, $2, $3)', [name, email, hashedPassword])
    res.status(201).json({ title: 'Sucesso', description: 'Usuário registrado com sucesso' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ title: 'Erro', description: 'Erro ao registrar usuário' })
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await db.oneOrNone('SELECT email, senha FROM usuario WHERE email = $1', [email])

    if (!user) {
      return res.status(400).json({ title: 'Erro', description: 'Credenciais incorretas' })
    }

    const isPasswordValid = await bcrypt.compare(password, user.senha)

    if (!isPasswordValid) {
      return res.status(400).json({ title: 'Erro', description: 'Credenciais incorretas' })
    }

    const token = jwt.sign({ email: user.email }, 'your_jwt_secret', { expiresIn: '1h' })
    res.status(200).json({ title: 'success', description: 'Usuário logado com sucesso', token: token })
  } catch (error) {
    console.error(error)
    res.status(500).json({ title: 'Erro', description: 'Erro ao se autenticar' })
  }
}
