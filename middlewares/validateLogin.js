const validateMiddleware = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || email === '') {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!password || password === '') {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  next();
};

module.exports = validateMiddleware;
