// Validate Token
// status(401) = Unauthorized Request
function valToken(req, res, next) {
  const { authorization: token } = req.headers;

  if (!token) {
    res.status(401).json({ message: 'Token não encontrado' });
  }

  if (token.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }

  next();
}

module.exports = valToken;
