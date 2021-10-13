const validateWatchedAt = (req, res, next) => {
    const { talk: { watchedAt } } = req.body;
    const date = /^[0-9]{2}[/][0-9]{2}[/][0-9]{4}$/.test(watchedAt);
    if (!watchedAt) {
      return res.status(400)
        .json({
          message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
    }
    if (!date) {
      return res.status(400)
        .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    }
    next();
  };
  module.exports = validateWatchedAt;