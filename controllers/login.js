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

module.exports = {
  emailValidate,
};