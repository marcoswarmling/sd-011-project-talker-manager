function validateTalk(req, res, next) {
  const { talk } = req.body;

  const ERROR_MESSAGE = 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios';

  if (!talk || talk === '' || talk === {}) {
    return res.status(400).json({ message: ERROR_MESSAGE });
  }

  next();
}

module.exports = { validateTalk };
