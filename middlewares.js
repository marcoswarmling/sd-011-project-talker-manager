const { HTTP_BAD_REQUEST } = require('./httpStatusCodes');

const validateEmail = (request, response, next) => {
  const { email } = request.body;

  if (!email || email === '') {
    return response.status(HTTP_BAD_REQUEST).json({ message: 'O campo "email" é obrigatório' });
  }

  const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  if (!emailPattern.test(email)) {
    return response
      .status(HTTP_BAD_REQUEST)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  return next();
};

const validatePassword = (request, response, next) => {
  const { password } = request.body;
  
  if (!password || password === '') {
    return response
      .status(HTTP_BAD_REQUEST)
      .json({ message: 'O campo "password" é obrigatório' });
  }

  if (password.length < 6) {
    return response
      .status(HTTP_BAD_REQUEST)
      .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  return next();
};

module.exports = { validateEmail, validatePassword };