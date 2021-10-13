const crypto = require('crypto');

const genToken = (req, res, next) => {
    const { email, password } = req.body;
    if (email && password) {
      const token = crypto.randomBytes(8).toString('hex');
      res.status(200).json({ token });
    }
    next();
    };
    const verifyToken = (req, res, next) => {
        const token = req.headers.authorization;
        if (!token) res.status(401).json({ message: 'Token não encontrado' });
        if (token.length !== 16) res.status(401).json({ message: 'Token inválido' });
        next();
      };
  module.exports = { genToken, verifyToken };