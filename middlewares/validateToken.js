const { AuthorizationError } = require('../classes/Errors');

module.exports = function validateToken(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return next(new AuthorizationError('Token não encontrado'));
  }

  const token = authorization.replace('Bearer ', '');

  if (token.length !== 16) {
    return next(new AuthorizationError('Token inválido'));
  }

  next();
};
