const validatePassword = (req, res, next) => {
  const { password } = req.body;
  if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  if (password.length <= 6) { 
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' }); 
  }
  next();
};

const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const emailRegex = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;

  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });

  if (!emailRegex.test(email)) { 
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' }); 
  }

  next();
};

module.exports = { validatePassword, validateEmail };