const HTTP_ERROR_STATUS = 400;

const watchRateValid = (req, res, next) => {
  const { talk } = req.body;

  const dateFormat = /^[0-9]{2}[/]{1}[0-9]{2}[/]{1}[0-9]{4}$/g;

  if (!dateFormat.test(talk.watchedAt)) {
    return res.status(HTTP_ERROR_STATUS)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  if (talk.rate < 1 || talk.rate > 5) {
    return res.status(HTTP_ERROR_STATUS)
      .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

module.exports = watchRateValid;
