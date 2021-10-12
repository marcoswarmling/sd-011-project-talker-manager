const validateWatchedAt = (req, res, next) => {
  const { watchedAt } = req.body;
  const watchedAtFormat = /([0-2][0-9]|3[0-1])\/(0[0-9]|1[0-2])\/[0-9]{4}/;                   
  if (!watchedAtFormat.test(watchedAt)) { 
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

module.exports = validateWatchedAt;