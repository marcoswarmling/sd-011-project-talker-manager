const HTTP_ERROR_STATUS = 400;

const rateValid = (req, res, next) => {
  const { talk } = req.body;

  if (talk.rate < 1 || talk.rate > 5) {
    return res.status(HTTP_ERROR_STATUS)
      .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

module.exports = rateValid;
