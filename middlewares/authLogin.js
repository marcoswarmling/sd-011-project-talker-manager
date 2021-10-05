const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.([a-z]+))?$/i;

const validEmail = (email) => {
  if (!email) return 'O campo "email" é obrigatório';
  if (!regexEmail.test(email)) return 'O "email" deve ter o formato "email@email.com"';
  return '';
};

const validPassword = (password, msg) => {
  if (!password) return 'O campo "password" é obrigatório';
  if (password.length < 6) return 'O "password" deve ter pelo menos 6 caracteres';
  return msg;
};

const authLogin = (req, res, next) => {
  const err = { message: '' };
  const { email, password } = req.body;
  err.message = validEmail(email);
  err.message = validPassword(password, err.message);
  if (err.message !== '') return res.status(400).json(err);
  next();
};

module.exports = authLogin;
