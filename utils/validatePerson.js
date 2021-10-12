const err = (statusCode) => ({ statusCode });

const validationName = (name) => {
  if (!name) {
    throw err({ status: 400, message: 'O campo "name" é obrigatório' });
  }
  if (name.length <= 2) {
    throw err({ status: 400, message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
};

const validationAge = (age) => {
  if (!age) throw err({ status: 400, message: 'O campo "age" é obrigatório' });
  if (age < 18) {
    throw err({ status: 400, message: 'A pessoa palestrante deve ser maior de idade' });
  }
};

const validationWatchtedAt = (talk) => {
  const { watchedAt } = talk;
  if (!watchedAt) {
    throw err({ status: 400, 
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  const talkRegex = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/
    .test(watchedAt);
  if (!talkRegex) { 
    throw err({ status: 400,
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
};
const validationRate = (talk) => {
  const { rate } = talk;
  if (!rate && rate !== 0) {
    throw err({ status: 400, 
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  if (rate < 1 || rate > 5) {
    throw err({ status: 400,
      message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
};

const validateRateAndWatchtedAt = (talk) => {
  validationRate(talk);
  validationWatchtedAt(talk);
};

const validationTalk = (talk) => {
  if (!talk) {
    throw err({ status: 400, 
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  validateRateAndWatchtedAt(talk);
};

const validationToken = (token) => {
  if (!token) throw err({ status: 401, message: 'Token não encontrado' });
  if (token.length !== 16) throw err({ status: 401, message: 'Token inválido' });
};

module.exports = { validationToken, validationTalk, validationName, validationAge };
