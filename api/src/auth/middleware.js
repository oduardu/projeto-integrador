const jwt = require('jsonwebtoken');
const { blacklist } = require('./auth'); 
const jwt_secret = process.env.JWT_SECRET;

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ title: 'Erro', description: 'Token não fornecido' });
  }

  if (blacklist.includes(token)) {
    return res.status(401).json({ title: 'Erro', description: 'Token inválido' });
  }

  jwt.verify(token, jwt_secret, (err, user) => {
    if (err) {
      return res.status(403).json({ title: 'Erro', description: 'Token inválido' });
    }
    
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
