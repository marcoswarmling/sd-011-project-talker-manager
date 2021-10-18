const crypto = require('crypto');

const emailVerification = (req, resp, next) => {
  const { email } = req.body;

  const regexValidation = /\S+@\S+\.\S+/;
  // https://www.thiscodeworks.com/regex-how-to-validate-an-email-address-in-javascript-stack-overflow-javascript/5f3d44c0a489b90014e6cf08 - referencia da criacao do regex

    if (!email) {
      return resp.status(400).json({ message: 'O campo "email" é obrigatório' });
    }

    if (!regexValidation.test(email)) {
      return resp.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }
    next();
};

const passwordVerification = (req, resp, next) => {
  const { password } = req.body;
  if (!password) {
    return resp.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return resp.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

const generateToken = (req, _res, next) => {
  const token = crypto.randomBytes(8).toString('hex');
  req.token = token;
  next();
};

module.exports = {
  emailVerification,
  passwordVerification,
  generateToken,
};