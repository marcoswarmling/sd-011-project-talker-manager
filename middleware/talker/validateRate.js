function ifNotExists(rate, res) {
  const ERROR_MESSAGE = 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios';

  if ((!rate && rate !== 0) || rate === '') {
    return res.status(400).json({ message: ERROR_MESSAGE });
  }
}

function validateRate(req, res, next) {
  const { talk: { rate } } = req.body;

  ifNotExists(rate, res);

  if (rate <= 0 || rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  next();
}

module.exports = { validateRate };
