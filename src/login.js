const crypto = require('crypto');

const PASSWORD = 6;

const login = (req, res) => {
  const { email, password } = req.body;
  const checkEmail = /\S+@\S+\.\S+/i.test(email);
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!checkEmail) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < PASSWORD) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  return res.status(200).json({ token: crypto.randomBytes(8).toString('hex') });
};
module.exports = login;