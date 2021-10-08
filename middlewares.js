const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const re = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const result = re.test(String(email).toLowerCase());
  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  if (!result) {
    return res.status(400).json({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }
  next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;
  if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  if (password.length < 6) {
  return res.status(400)
    .json({ message: 'O "password" deve ter pelo menos 6 caracteres' }); 
  }
  next();
};

module.exports = {
  validatePassword,
  validateEmail,
};