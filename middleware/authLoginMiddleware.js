const authEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

// const authPassword = (password) => (!password ? password.length >= 6 : null);
const authPassword = (password, res) => {
  if (!password) {
    res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  } else {
    return password.length < 6;
  }
};

const checkLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email) res.status(400).json({ message: 'O campo "email" é obrigatório' });
  if (!password) res.status(400).json({ message: 'O campo "password" é obrigatório' });

  const validEmail = authEmail(email);

  if (!validEmail) {
    res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  authPassword(password, res);
  const validPassword = authPassword(password);
  if (validPassword) {
    res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
};

module.exports = checkLogin;
