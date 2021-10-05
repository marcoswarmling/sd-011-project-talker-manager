const crypto = require('crypto');

function generateToken() {
  return crypto.randomBytes(8).toString('hex');
}

function validateToken(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });
  if (authorization.length !== 16) return res.status(401).json({ message: 'Token inválido' });

  next();
}

function validateEmail(req, res, next) {
  const { email } = req.body;

  const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.([a-z]+))?$/i;

  if (!email || email === '') {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
    
  if (!regex.test(email)) {
    return res.status(400)
    .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  next();
}

function validatePassword(req, res, next) {
  const { password } = req.body;
  if (!password || password === '') {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
}
  
module.exports = { validateToken, validateEmail, validatePassword, generateToken };
