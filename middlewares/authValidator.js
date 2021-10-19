const { validateToken } = require('../helpers/validateToken');

const authValidator = (req, res, next) => {
  const { authorization: token } = req.headers;

  if (!token) return res.status(401).send({ message: 'Token não encontrado' });

  if (!validateToken(token)) return res.status(401).send({ message: 'Token inválido' });

  next();
};

module.exports = { authValidator };