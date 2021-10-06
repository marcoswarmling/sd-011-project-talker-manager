function validateWatchedAt(req, res, next) {
  const { talk: { watchedAt } } = req.body;

  const ERROR_MESSAGE = 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios';

  if (!watchedAt || watchedAt === '') {
    return res.status(400).json({ message: ERROR_MESSAGE });
  }

  const validateDate = /^[0-9]{2}\/{1}[0-9]{2}\/{1}[0-9]{4}$/g;
  const testDate = validateDate.test(watchedAt);
  if (!testDate) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  next();
}

module.exports = { validateWatchedAt };
