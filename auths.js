const crypto = require('crypto');

function validateToken(req, res, next) {
  const { authorization } = req.headers;

  const token = crypto.randomBytes(8).toString('hex');

  res.status(200).json({ token: `${token}` });

  if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });
  if (authorization.length !== 16) return res.status(401).json({ message: 'Token inválido' });

  next();
}

// const userInfo = {
//   email: 'email@email.com',
//   password: 123456,
// };

function validateUserInfo(req, res, next) {
  const { email, password } = req.headers;

  const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;

  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  if (email !== regex) {
    return res.status(400)
    .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  
  if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  res.status(200).json({ email: `${email}`, password: `${password}` });

  next();
}

module.exports = { validateToken, validateUserInfo };