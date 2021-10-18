const authToken = (req, res, next) => {
  const { authorization: token } = req.headers;

  if (!token) res.status(401).json({ message: 'Token não encontrado' });
  const checkToken = token || 'invalid';

  if (checkToken.length !== 16) res.status(401).json({ message: 'Token inválido' });
  
  next();
};

module.exports = authToken;