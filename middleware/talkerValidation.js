const HTTP_BAD_REQUEST_STATUS = 400;
const HTTP_UNAUTHORIZED_STATUS = 401;

function validateToken(request, response, next) {
  const { token } = request.headers;

  if (!token || token === '') {
    return response
      .status(HTTP_UNAUTHORIZED_STATUS)
      .json({ message: 'Token não encontrado' });
  }

  if (token.length !== 16) {
    return response
      .status(HTTP_UNAUTHORIZED_STATUS)
      .json({ message: 'Token inválido' });
  }

  next();
}

function validateName(request, response, next) {
  const { name } = request.body;

  if (!name || name === '') {
    return response
      .status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'O campo "name" é obrigatório' });
  }

  if (name.length < 3) {
    return response
      .status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
}

function validateAge(request, response, next) {
  const { age } = request.body;
  const ageLimit = 18;

  if (!age || age === '') {
    return response
      .status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'O campo "age" é obrigatório' });
  }

  if (age >= ageLimit) {
    return response
      .status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
}

function validateTalk(request, response, next) {
  const { talk } = request.body;
  const messageError = 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios';

  if (!talk || talk === '' || talk === {}) {
    return response
      .status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: messageError });
  }

  next();
}

function validateTalkWatchedAt(request, response, next) {
  const { talk: { watchedAt } } = request.body;
  const messageError = 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios';
  const watchedAtRegex = /^(0?[1-9]|[12][0-9]|3[01])\/-(0?[1-9]|1[012])\/-\d{4}$/;
  
  if (!watchedAt || watchedAt === '') {
    return response
      .status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: messageError });
  }

  if (!watchedAtRegex.test(watchedAt)) {
    return response
      .status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  next();
}

function validateTalkRate(request, response, next) {
  const { talk: { rate } } = request.body;
  const messageError = 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios';

  if (!rate || rate === '') {
    return response
      .status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: messageError });
  }

  if (rate < 1 || rate > 5) {
    return response
      .status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  next();
}

module.exports = {
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateTalkWatchedAt,
  validateTalkRate,
};
