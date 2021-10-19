const UNAUTHORIZED = 401;

const validateToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization && authorization !== '') { 
    return res.status(UNAUTHORIZED).json({ message: 'Token não encontrado' });
  }
  if (authorization !== '7mqaVRXJSp886CGr') {
    return res.status(UNAUTHORIZED).json({ message: 'Token inválido' });
  }
  next();
};

module.exports = {
  validateToken,
};
