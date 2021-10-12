const authCheck = (req, res, next) => {
  const { authorization: authToken } = req.headers;

  if (!authToken) return res.status(401).json({ message: 'Token não encontrado' });
  if (authToken.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  next();
};

module.exports = authCheck;
