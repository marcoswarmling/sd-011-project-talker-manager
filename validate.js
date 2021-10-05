const crypto = require('crypto');

function generatorToken() {
  const token = crypto.randomBytes(8).toString('hex');
  return token;
}

function validateToken(req, res, next) {
  const { authorization } = req.headers;

  if (authorization.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }

  return next();
}

function validateEmail(req, res, next) {
  const { email } = req.headers;
  const regex = email.match(/[a-z]+@[a-z]+.com/gi);
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }

  if (email !== regex) {
    return res
      .status(400)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
   res.status(200).json({ email: `${email}` });

  next();
}

function validatePassword(req, res, next) {
  const { password } = req.headers;
  if (!password) {
    return res
      .status(401)
      .json({ message: 'O campo "password" é obrigatório' });
  }

  if (password > 6) {
    return res
      .status(401)
      .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
  res.status(200).json({ password: `${password}` });
}

module.exports = { validateToken, validateEmail, validatePassword, generatorToken };
