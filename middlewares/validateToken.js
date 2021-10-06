const validateTokenAuthorization = (req, res, next) => {
  const TOKEN_LENGTH = 16;
  const { authorization } = req.headers;
  if (!authorization) res.status(401).send({ message: 'Token não encontrado' });
  if (authorization.length !== TOKEN_LENGTH) res.status(401).send({ message: 'Token inválido' });
  next();
};

module.exports = {
  validateTokenAuthorization,
};