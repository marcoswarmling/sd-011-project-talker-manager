const validateEmail = (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }

  if (!/^[a-z]+@[a-z]+\.com$/.test(email)) {
    res.status(400).json({ message: 'O email deve ter o formato "email@email.com"' });
  }

  next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;

  if (!password) {
    res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }

  if (password.length < 6) {
    res.status(400).json({ message: 'O password deve ter pelo menos 6 caracteres' });
  }

  next();
};

module.exports = { validateEmail, validatePassword };
