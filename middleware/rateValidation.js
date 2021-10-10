const HTTP_BAD_REQUEST_STATUS = 400;

const rateValidation = (req, res, next) => {
  const MIN_RATE = 1;
  const MAX_RATE = 5;
  const { talk } = req.body;

  if (talk.rate < MIN_RATE || talk.rate > MAX_RATE) {
    return res.status(HTTP_BAD_REQUEST_STATUS).json(
      { message: 'O campo "rate" deve ser um inteiro de 1 à 5' },
    );
  }

  next();
};

module.exports = rateValidation;
