// Requisito 3

const crypto = require('crypto');

function verifyEmailExists(req, res, next) {
  const { email } = req.body;

  if (email === '' || !email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  next();
}

function verifyEmailisValid(req, res, next) {
  const { email } = req.body;

  if (!email || !email.includes('@') || !email.includes('.com')) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
}

function verifyPasswordExists(req, res, next) {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  next();
}

function verifyPasswordIsValid(req, res, next) {
  const { password } = req.body;

  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
}

function generateToken() {
  const token = crypto.randomBytes(8).toString('hex');
  return token;
  // nao precisei da next() aqui. Está correto?
}

function verifyTokenIsValid(req, res, next) {
  const token = req.headers.authorization;

  if (!token || token.length !== 16) {
    return res.status(401).json({ message: 'Token inválido!' });
  }

  next();
}

module.exports = {
  verifyEmailExists,
  verifyEmailisValid,
  verifyPasswordExists,
  verifyPasswordIsValid,
  generateToken,
  verifyTokenIsValid,
};
