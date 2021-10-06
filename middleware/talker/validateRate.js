function validateRate(req, res, next) {
  const { talk: { rate } } = req.body;

  const ERROR_MESSAGE = 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios';

  if (!rate || rate === '') {
    return res.status(400).json({ message: ERROR_MESSAGE });
  }

  if (rate < 1 || rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  next();
}

module.exports = { validateRate };
