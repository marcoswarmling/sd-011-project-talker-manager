const validateToken = (req, res, next) => {
    const token = req.headers.authorization;
  
    if (!token || token === '') {
      return res.status(401).json({ message: 'Token não encontrado' });
    }
    if (token.length !== 16) {
      return res.status(401).json({ message: 'Token inválido' });
    }    
};

module.exports = {
    validateToken,
};