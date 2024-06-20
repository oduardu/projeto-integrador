const { db } = require("../database/connection")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
  try {
      const { email, password } = req.body
      const hashedPassword = await bcrypt.hash(password, 10)
  
      const result = await db.oneOrNone('SELECT email FROM users WHERE email = $1', [email])
  
      if (result) {
        return res.status(400).send('O email já existe')
      }
  
      await db.none('INSERT INTO users (email, pass) VALUES ($1, $2)', [email, hashedPassword])
      res.status(201).send('Usuário registrado com sucesso')
    } catch (error) {
      console.error(error)
      res.status(500).send('Erro ao registrar usuário')
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
    
        const user = await db.oneOrNone('SELECT email, pass FROM users WHERE email = $1', [email])
    
        if (!user) {
          return res.status(400).send('Credenciais incorretas')
        }
    
        const isPasswordValid = await bcrypt.compare(password, user.pass)
    
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
