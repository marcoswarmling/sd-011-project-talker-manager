const { validateWatchedAt, validateRate } = require('../helpers/validateTalk');

const talkValidator = (req, res, next) => {
  const { talk } = req.body;

  if (!talk || !talk.watchedAt || !talk.rate) {
    const message = 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios';
    return res.status(400).send({ message });
  }

  next();
};

const talkKeysValidator = (req, res, next) => {
  const { talk: { watchedAt, rate } } = req.body;

  if (!validateWatchedAt(watchedAt)) {
    return res.status(400).send({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  if (!validateRate(rate)) {
    return res.status(400).send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  next();
};

module.exports = { talkValidator, talkKeysValidator };