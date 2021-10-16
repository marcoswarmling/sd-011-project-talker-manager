const tokenValidate = (req, res, next) => {
    const token = req.headers.authorization;
  
    if (!token || token === '') {
      return res.status(401).json({
          message: 'Token não encontrado' });
    }
    if (token !== '7mqaVRXJSp886CGr') {
        return res.status(401).json({
            message: 'Token inválido' });
      }
    
    next();
  };
  
  module.exports = tokenValidate;