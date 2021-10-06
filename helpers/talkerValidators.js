const validateDate = require('validate-date');

const HTTP_BAD_REQUEST_STATUS = 400;
const HTTP_UNAUTHORIZED_STATUS = 401;

const talkerErrorMessages = {
  talkerNotFound: { message: 'Pessoa palestrante não encontrada' },
  tokenNotFound: { message: 'Token não encontrado' },
  invalidToken: { message: 'Token inválido' },
  nameNotFound: { message: 'O campo "name" é obrigatório' },
  nameWrong: { message: 'O "name" deve ter pelo menos 3 caracteres' },
  ageNotFound: { message: 'O campo "age" é obrigatório' },
  ageWrong: { message: 'A pessoa palestrante deve ser maior de idade' },
  wrongTalk: {
    message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
  },
  wrongWatchedAt: { message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' },
  wrongRate: { message: 'O campo "rate" deve ser um inteiro de 1 à 5' },
};

function validateToken(request, response, next) {
  const { authorization: token } = request.headers;
  const { tokenNotFound, invalidToken } = talkerErrorMessages;
  if (!token) return response.status(HTTP_UNAUTHORIZED_STATUS).json(tokenNotFound);
  if (token.length !== 16) return response.status(HTTP_UNAUTHORIZED_STATUS).json(invalidToken);
  next();
}

function validateName(request, response, next) {
  const { name } = request.body;
  const { nameNotFound, nameWrong } = talkerErrorMessages;
  if (!name) return response.status(HTTP_BAD_REQUEST_STATUS).json(nameNotFound);
  if (name.length < 3) return response.status(HTTP_BAD_REQUEST_STATUS).json(nameWrong);
  next();
}

function validateAge(request, response, next) {
  const { age } = request.body;
  const { ageNotFound, ageWrong } = talkerErrorMessages;
  if (!age) return response.status(HTTP_BAD_REQUEST_STATUS).json(ageNotFound);
  if (age < 18) return response.status(HTTP_BAD_REQUEST_STATUS).json(ageWrong);
  next();
}

function validateTalk(request, response, next) {
  const { talk } = request.body;
  const talkTest = talk || { watchedAt: undefined, rate: undefined };
  const { wrongTalk } = talkerErrorMessages;
  if (talkTest.watchedAt === undefined || talkTest.rate === undefined) {
    return response.status(HTTP_BAD_REQUEST_STATUS).json(wrongTalk);
  }
  next();
}

function validateTalkAttributes(request, response, next) {
  const { talk: { watchedAt, rate } } = request.body;
  const { wrongWatchedAt, wrongRate } = talkerErrorMessages;
  if (validateDate(watchedAt, 'dd/mm/yyyy') === 'Invalid Format') {
    return response.status(HTTP_BAD_REQUEST_STATUS).json(wrongWatchedAt);
  }
  if (rate % 1 !== 0 || rate > 5 || rate < 1) {
    return response.status(HTTP_BAD_REQUEST_STATUS).json(wrongRate);
  }
  next();
}

module.exports = { validateToken, validateName, validateAge, validateTalk, validateTalkAttributes };
