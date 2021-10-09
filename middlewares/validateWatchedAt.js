const validWatchedAt = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;
  // Adaptado de https://regexland.com/regex-dates/
  const regexCheck = /^(0[1-9]|[12][0-9]|3[01])(\/)(0[1-9]|1[0-2])(\/)\d{4}$/;
  if (!regexCheck.test(watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

module.exports = validWatchedAt;