const { StatusCodes } = require('http-status-codes');

const emailValidate = (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'O campo "email" é obrigatório' });
  }
  const validEmail = /^\w+@\w+.\w{2,3}$/.test(email);
  if (!validEmail) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
};

const passwordValidate = (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

module.exports = {
  emailValidate,
  passwordValidate,
};