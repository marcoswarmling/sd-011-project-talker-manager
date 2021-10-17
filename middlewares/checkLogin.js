const validator = require('validator');

const checkEmail = (req, res, next) => {
  const { email } = req.body;
  if (!email || validator.isEmpty(email)) {
    return res
      .status(400)
      .json({ message: 'O campo "email" é obrigatório' }); 
  }
  if (!(validator.isEmail(email))) {
    return res
      .status(400)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
};

const checkPassword = (req, res, next) => {
  const { password } = req.body;
  if (!password || validator.isEmpty(password)) {
    return res
      .status(400)
      .json({ message: 'O campo "password" é obrigatório' }); 
  }
  if (!(validator.isLength(password, { min: 6, max: undefined }))) {
    return res
      .status(400)
      .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

module.exports = {
  checkEmail,
  checkPassword,
};