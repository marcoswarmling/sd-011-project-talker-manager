const HTTP_ERROR_STATUS = 400;

const watchRateValid = (req, res, next) => {
  const { talk } = req.body;

  const dateFormat = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[1-9]|2[1-9])$/;

  if (dateFormat.test(talk.watchedAt)) {
    return res.status(HTTP_ERROR_STATUS)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  if (parseInt(talk.rate, 10) < 0 && parseInt(talk.rate, 10) >= 5) {
    return res.status(HTTP_ERROR_STATUS)
      .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

module.exports = watchRateValid;
