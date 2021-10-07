const HTTP_ERROR_STATUS = 400;

const talkValid = (req, res, next) => {
  const { talk } = req.body;

  const msg = 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios"';

  if (!talk) {
    return res.status(HTTP_ERROR_STATUS)
      .json({ message: msg });
  }
  if (!talk.rate || !talk.watchedAt) {
    return res.status(HTTP_ERROR_STATUS)
      .json({ message: msg });
  }
  next();
};

module.exports = talkValid;
