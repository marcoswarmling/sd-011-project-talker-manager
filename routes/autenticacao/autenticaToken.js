const autenticaToken = (req, res, next) => {
    const { authorization } = req.headers;
  
    if (!authorization || authorization === '') {
      return res.status(401).json({ message: 'Token não encontrado' });
    }
  
    if (authorization !== '7mqaVRXJSp886CGr') {
      return res.status(401).json({ message: 'Token inválido' });
    } 
  
    next();
  };
  
  module.exports = autenticaToken;