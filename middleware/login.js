const randtoken = require('rand-token');

const emailValidator = (req, res, next) => {
  const REGEX_VALID_EMAIL = /^[^\s@]+@[^\s@]+$/i;
  const { email } = req.body;

  if (!email || email === '') {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }

  if (!email.match(REGEX_VALID_EMAIL)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
};

const passwordValidator = (req, res, next) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (+password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

const tokenCreator = (req, _res, next) => {
  const token = randtoken.generate(16);
  req.token = token;
  next();
};

module.exports = {
  emailValidator,
  passwordValidator,
  tokenCreator,
};