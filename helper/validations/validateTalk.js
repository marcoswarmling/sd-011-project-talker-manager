const validateRate = (rate, res) => {
  if (!Number.isInteger(rate) && rate < 1 && rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
};

const validateTalk = (req, res, next) => {
  const { talk } = req.body;

  const watchedAtFormat = /^[\d]{2}\/[\d]{2}\/[\d]{4}$/;

  if (!talk.watchedAT || !talk.rate || !talk) {
    return res.status(400).json({ 
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }

  if (!watchedAtFormat.test(talk.watchedAT)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  validateRate(talk.rate, res);

  next();
};

module.exports = validateTalk;