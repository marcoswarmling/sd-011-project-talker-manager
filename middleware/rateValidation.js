const HTTP_BAD_REQUEST_STATUS = 400;

const rateValidation = (req, res, next) => {
  const MIN_RATE = 1;
  const MAX_RATE = 5;
  const { rate } = req.body.rate;

  if (!rate) {
    return res.status(HTTP_BAD_REQUEST_STATUS).json(
      { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' },
    );
  }

  if (rate < MIN_RATE || rate > MAX_RATE) {
    return res.status(HTTP_BAD_REQUEST_STATUS).json(
      { message: 'O campo "rate" deve ser um inteiro de 1 à 5' },
    );
  }

  next();
};

module.exports = rateValidation;
