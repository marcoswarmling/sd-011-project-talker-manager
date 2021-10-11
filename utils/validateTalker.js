// Validate Talker
function valTalker(req, res, next) {
  const { talk } = req.body;

  if (talk === undefined || talk.rate === undefined || !talk.watchedAt) {
    return res.status(400).json(
      { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' },
    );
  }

  next();
}

module.exports = {
  valTalker,
};
