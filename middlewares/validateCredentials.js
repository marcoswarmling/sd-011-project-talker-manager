const emailValidator = (email) => {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/igm;
  const validateEmail = emailRegex.test(email);
  return validateEmail;
};

const passwordValidator = (password) => {
  const pass = password.split('');
  if (pass.length < 6) {
    return false;
  }
  return true;
};

const validateEmailMiddleware = (req, res, next) => {
  const { email, password } = req.body;
  const validEmail = emailValidator(email);
  if (!validEmail) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  const validPassword = passwordValidator(password);
  if (!validPassword) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

module.exports = validateEmailMiddleware;
