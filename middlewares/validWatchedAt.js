const validWatchedAt = (req, res, next) => {
  const { talk } = req.body;
  const { watchedAt } = talk;
  // Regex obtido em https://www.regextester.com/99555 
  const regexDate = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;

  if (!regexDate.test(watchedAt)) {
    return res.status(400)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

module.exports = validWatchedAt;
