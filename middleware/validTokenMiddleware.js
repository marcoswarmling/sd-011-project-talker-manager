const authToken = (req, res, next) => {
  const { authorization: token } = req.headers;

  if (!token) return res.status(401).json({ message: 'Token não encontrado' });
  const checkToken = token || 'invalid';

  if (checkToken.length !== 16) return res.status(401).json({ message: 'Token inválido' });
  
  next();
};

module.exports = authToken;