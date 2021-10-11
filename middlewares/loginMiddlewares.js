const HTTP_STATUS_400 = 400;

const emailHandler = (req, res, next) => {
  const { email } = req.body;
  const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;

  if (!email || email === '') {
    return res.status(HTTP_STATUS_400).json({ message: 'O campo "email" é obrigatório' });
  }

  if (!emailRegex.test(email)) {
    return res.status(HTTP_STATUS_400).json({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }

  next();
};

const passwordHandler = (req, res, next) => {
  const { password } = req.body;

  if (!password || password === '') {
    return res.status(HTTP_STATUS_400).json({ message: 'O campo "password" é obrigatório' });
  }

  if (password.length < 6) {
    return res.status(HTTP_STATUS_400).json({
      message: 'O "password" deve ter pelo menos 6 caracteres',
    });
  }

  next();
};

module.exports = { emailHandler, passwordHandler };