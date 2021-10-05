const { validateToken } = require('./validateUpdate');

const validateDelete = (req, res, next) => {
  const { authorization } = req.headers;
  const checkToken = validateToken(authorization);
  if (checkToken) return res.status(401).json(checkToken);
  next();
};

module.exports = validateDelete;