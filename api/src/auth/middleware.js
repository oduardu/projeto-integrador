const jwt = require('jsonwebtoken')

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization
  const jwt_secret = process.env.JWT_SECRET

  if (token == null) return res.status(401).json({ title: 'Erro', description: 'Token não fornecido' })

  jwt.verify(token, jwt_secret, (err, user) => {
    if (err) return res.status(403).json({ title: 'Erro', description: 'Token inválido' })

    req.user = user
    next()
  })
}

module.exports = authenticateToken
