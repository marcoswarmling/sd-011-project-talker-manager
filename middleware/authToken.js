const HTTP_UNAUTHORIZED_STATUS = 401;

const authToken = (req, res, next) => {
  const SIZE_TOKEN = 16;
  const token = req.headers.authorization;

  if (!token) {
    return res.status(HTTP_UNAUTHORIZED_STATUS).json({ message: 'Token não encontrado' });
  }

  if (token.length !== SIZE_TOKEN) {
    return res.status(HTTP_UNAUTHORIZED_STATUS).json({ message: 'Token inválido' });
  }

  next();
};

module.exports = authToken;
