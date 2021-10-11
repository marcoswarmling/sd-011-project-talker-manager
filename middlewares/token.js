function valToken(req, res, next) {
  const { authentication } = req.body;

  if (!authentication || authentication === '') {
    return res.status(401).json({ message: 'Token não encontrado' });
  }

  if (authentication.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }

  next();
}

module.exports = valToken;