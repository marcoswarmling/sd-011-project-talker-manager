const { isMatch } = require('date-fns');
const { HTTP_BAD_REQUEST, HTTP_UNAUTHORIZED } = require('./httpStatusCodes');

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

const authentication = (request, response, next) => {
  const { authorization: authToken } = request.headers;
  if (!authToken) {
    return response.status(HTTP_UNAUTHORIZED).json({
      message: 'Token não encontrado',
    });
  }
  if (authToken.length !== 16) {
    return response.status(HTTP_UNAUTHORIZED).json({
      message: 'Token inválido',
    });
  }
  return next();
};

const validateName = (request, response, next) => {
  const { name } = request.body;
  if (!name) {
    return response.status(HTTP_BAD_REQUEST).json({
      message: 'O campo "name" é obrigatório',
    });
  }
  if (name.length < 3) {
    return response.status(HTTP_BAD_REQUEST).json({
      message: 'O "name" deve ter pelo menos 3 caracteres',
    });
  }
  return next();
};

const validateAge = (request, response, next) => {
  const { age } = request.body;
  if (!age) {
    return response.status(HTTP_BAD_REQUEST).json({
      message: 'O campo "age" é obrigatório',
    });
  }
  if (age < 18) {
    return response.status(HTTP_BAD_REQUEST).json({
      message: 'A pessoa palestrante deve ser maior de idade',
    });
  }
  return next();
};

const validateTalk = (request, response, next) => {
  const { talk } = request.body;
  if (!talk || !talk.watchedAt || talk.rate === undefined) {
    return response.status(HTTP_BAD_REQUEST).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }

  return next();
};

const validateTalkDate = (request, response, next) => {
  const { talk: { watchedAt } } = request.body;
  const isValidDate = isMatch(watchedAt, 'dd/MM/yyyy');
  if (!isValidDate) {
    return response.status(HTTP_BAD_REQUEST).json({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }
  return next();
};

const validateTalkRate = (request, response, next) => {
  const { talk: { rate } } = request.body;
  const isValidRate = Number.isInteger(rate) && rate >= 1 && rate <= 5;
  if (!isValidRate) {
    return response.status(HTTP_BAD_REQUEST).json({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }
  return next();
};

const validateTalkerData = [
  validateName,
  validateAge,
  validateTalk,
  validateTalkDate,
  validateTalkRate,
];

module.exports = {
  validateEmail,
  validatePassword,
  authentication,
  validateTalkerData,
};