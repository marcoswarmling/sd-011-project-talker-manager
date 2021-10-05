const crypto = require('crypto');

const token = crypto.randomBytes(8).toString('hex');

function validateToken(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });
  if (authorization !== token) return res.status(401).json({ message: 'Token inválido' });

  next();
}

module.exports = { token, validateToken };
