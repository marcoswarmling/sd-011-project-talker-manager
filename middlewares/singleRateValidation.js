const rateValidator = (rate) => {
  if (rate < 1 || rate > 5) {
    return false;
  }
  return true;
};

const singleRateValidation = (req, res, next) => {
  const { rate } = req.body.talk;
  const validRate = rateValidator(rate);
  if (!validRate) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  if (!rate) {
    return res.status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  next();
};

module.exports = singleRateValidation;