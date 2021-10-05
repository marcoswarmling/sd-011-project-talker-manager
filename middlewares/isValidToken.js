const HTTP_UNAUTHORIZED_STATUS = 401;

const isValidToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(HTTP_UNAUTHORIZED_STATUS).json({ message: 'Token não encontrado' });
  }

  if (authorization !== '7mqaVRXJSp886CGr') {
    return res.status(HTTP_UNAUTHORIZED_STATUS).json({ message: 'Token inválido' });
  }

  next();
};

module.exports = isValidToken;
