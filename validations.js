const validUserName = (req, res, next) => {
  const { username } = req.body;
  if (!username || username.length < 3) {
    return res.status(400).json({ message: 'Username must be at least 3' });
  }
  next();
};

const validEmail = (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }

  if (!email.includes('@') || !email.includes('.com')) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  next();
};

const validPassword = (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

const validToken = (req, res, next) => {
  console.log(req.headers);
  const token = req.headers.authorization;
  const tokenRegex = /^[a-zA-Z0-9-_]{12}$/;
  if (!token || !tokenRegex.test(token)) {
    return res.status(400).json({ message: 'Invalid Token' });
  }
  next();
};

module.exports = {
  validUserName,
  validEmail,
  validPassword,
  validToken,
};
