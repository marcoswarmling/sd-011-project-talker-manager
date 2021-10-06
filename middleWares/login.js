const { emailValidate, passawordValidate } = require('../functionsLogin/index');

const login = (req, res, next) => {
  const { email, passaword } = req.body;
  if (!email) { return res.status(400).json({ message: 'O campo "email" é obrigatório' }); }
    
  if (!passaword) { return res.status(400).json({ message: 'O campo "password" é obrigatório' }); }

  const emailValidation = emailValidate(email);
  const passawordValidation = passawordValidate(passaword);

  if (!emailValidation) {
        return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  if (!passawordValidation) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
};

module.exports = login;
