const { db } = require("../database/connection")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
  try {
      const { name, email, password } = req.body
      const hashedPassword = await bcrypt.hash(password, 10)
  
      const result = await db.oneOrNone('SELECT nome, email, senha FROM usuario WHERE email = $1', [email])
  
      if (result) {
        return res.status(400).send('O usuário já existe')
      }
  
      await db.none('INSERT INTO users (nome, email, senha) VALUES ($1, $2, $3)', [name, email, hashedPassword])
      res.status(201).send('Usuário registrado com sucesso')
    } catch (error) {
      console.error(error)
      res.status(500).send('Erro ao registrar usuário')
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
    
        const user = await db.oneOrNone('SELECT email, senha FROM usuario WHERE email = $1', [email])
    
        if (!user) {
          return res.status(400).send('Credenciais incorretas')
        }
    
        const isPasswordValid = await bcrypt.compare(password, user.senha)
    
        if (!isPasswordValid) {
          return res.status(400).send('Credenciais incorretas')
        }

        const token = jwt.sign({ email: user.email }, 'your_jwt_secret', { expiresIn: '1h' })
        res.status(200).send({ token })
      } catch (error) {
        console.error(error)
        res.status(500).send('Erro ao se autenticar')
      }
}
