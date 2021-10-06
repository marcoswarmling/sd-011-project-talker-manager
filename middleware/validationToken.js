const HTTP_ERROR_STATUS = 401;

const tokenValid = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(HTTP_ERROR_STATUS).json({ message: 'Token não encontrado' });
  }
  if (token.length !== 16) {
    return res.status(HTTP_ERROR_STATUS).json({ message: 'Token inválido' });
  }
  next();
};

module.exports = tokenValid;
