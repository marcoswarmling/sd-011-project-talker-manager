const BAD_REQUEST = 400;

const validateWatchedAt = (watchedAt, res) => {
  const regexFormatDate = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
  const whatchedAtIsValid = regexFormatDate.test(watchedAt);
  if (!whatchedAtIsValid) { 
    return res.status(BAD_REQUEST)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
};

const validateRate = (rate, res) => {
  if (!(Number.isInteger(rate) && rate >= 1 && rate <= 5)) {
    return res.status(BAD_REQUEST)
      .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
};

const validateTalk = (req, res, next) => {
  const { talk } = req.body;
  console.log(req.body);
  // if (!talk) return res.status(BAD_REQUEST).json
  if (!talk || !talk.watchedAt || !talk.rate) { 
    return res.status(BAD_REQUEST)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  validateWatchedAt(talk.watchedAt, res);
  validateRate(talk.rate, res);
  next();
};

module.exports = {
  validateTalk,
};
