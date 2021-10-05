// Requisito 3

const verifyEmailExists = (req, res, next) => {
  const { email } = req.body;

  if (email === '' || !email) {
    res.status(400).json({ message: 'O campo "email" é obrigatório' });
    next();
  }
};

const verifyEmailisValid = (req, res, next) => {
  const { email } = req.body;

  if (!email || !email.includes('@') || !email.includes('.com')) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
};

const verifyPasswordExists = (req, res, next) => {
  const { password } = req.body;

  if (password === '' || !password) {
    res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  next();
};

const verifyPasswordIsValid = (req, res, next) => {
  const { password } = req.body;

  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

module.exports = {
  verifyEmailExists,
  verifyEmailisValid,
  verifyPasswordExists,
  verifyPasswordIsValid,
};
