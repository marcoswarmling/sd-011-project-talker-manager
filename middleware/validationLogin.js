const crypto = require('crypto');

function generateToken() {
  return crypto.randomBytes(8).toString('hex');
}

const emailValidate = (req, res, next) => {
  const { email } = req.body;
  const emailRegex = /\S+@\S+\.\S+/;

  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  next();
};

const passwordValidate = (req, res, next) => {
  const { password } = req.body;
  const passwordRegex = /(.){6,}/;

  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }

  if (!passwordRegex.test(password)) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
};

module.exports = {
  generateToken,
  emailValidate,
  passwordValidate,
};