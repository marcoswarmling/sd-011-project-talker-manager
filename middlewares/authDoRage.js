const regexDate = /^\d{2}\/\d{2}\/\d{4}$/gm;

const authDoRage = (req, res, next) => {
  const { talk: { watchedAt, rate } } = req.body;
  if (rate < 1 || rate > 5) {
    return res.status(400)
      .json({
        message: 'O campo "rate" deve ser um inteiro de 1 à 5',
      });
  }
  if (!regexDate.test(watchedAt)) {
    return res.status(400)
      .json({
        message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
      });
  }

  next();
};

module.exports = authDoRage;
