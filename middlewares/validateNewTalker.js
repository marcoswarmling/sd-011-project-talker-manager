// Requisito 4

function verifyTokenIsValid(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }

  if (token.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }

  next();
}

function nameValidation(req, res, next) {
  const { name } = req.body;

  if (!name || name === '') {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }

  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
}

function ageValidation(req, res, next) {
  const { age } = req.body;
  
  if (!age || age === '') {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }

  if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
}

function verifyTalkAndKeysExists(req, res, next) {
  const { talk } = req.body;
  const msg = 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios';

  if (!talk || !talk.watchedAt || (talk.rate !== 0 && !talk.rate)) {
    return res.status(400).json({ message: msg });
  }
  next();
}

function talkKeysValidation(req, res, next) {
  const { talk: { watchedAt, rate } } = req.body;
  const regexForDates = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
  /* Referencia de onde a regex foi retirada: https://stackoverflow.com/questions/5465375/javascript-date-regex-dd-mm-yyyy */

  if (!regexForDates.test(watchedAt)) {
    // A função test faz a verificação do watchedAt como dd/mm/yyyy.
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  if (rate < 1 || rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
}

module.exports = {
  verifyTokenIsValid,
  nameValidation,
  ageValidation,
  verifyTalkAndKeysExists,
  talkKeysValidation,
};
