const validateTalkKeys = (req, res, next) => {
  const { talk } = req.body;
  const { watchedAt, rate } = talk;
  const dateRegex = /([0-2][0-9]|3[0-1])\/(0[0-9]|1[0-2])\/[0-9]{4}/;
  if (!dateRegex.test(watchedAt)) {
    return res.status(400)
    .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  if (!(Number(rate) >= 1 && Number(rate) <= 5)) {
    return res.status(400)
    .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  next();
};

module.exports = validateTalkKeys;
