const HTTP_BAD_REQUEST_STATUS = 400;

const isValidWatchedAt = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;

  if (!watchedAt) {
    return res.status(HTTP_BAD_REQUEST_STATUS)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }

  if (
    watchedAt.split('/')[0].length !== 2 
    || watchedAt.split('/')[1].length !== 2 
    || watchedAt.split('/')[2].length !== 4
  ) {
    return res.status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  next();
};

module.exports = isValidWatchedAt;
