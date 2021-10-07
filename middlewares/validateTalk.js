const validateTalk = (req, res, next) => {
  const { talk } = req.body;
  // const { rate, watchedAt } = talk;

  if (!talk || !talk.watchedAt || !talk.rate) {
    return res.status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }

  next();
};

module.exports = validateTalk;