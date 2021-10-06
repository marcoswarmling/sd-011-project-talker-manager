function validateToken(req, res, next) {
  const token = req.headers.authorization;
  const emptyToken = { message: 'Token não encontrado' };
  const invalidToken = { message: 'Token inválido' };

  if (!token) return res.status(401).json(emptyToken);
  if (token.length !== 16) return res.status(401).json(invalidToken);

  next();  
}

module.exports = validateToken;
