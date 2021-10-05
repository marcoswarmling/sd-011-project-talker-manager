module.exports = function validateToken(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }

  const token = authorization.replace('Bearer ', '');

  if (token.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }

  next();
};
