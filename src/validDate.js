const validDate = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;
  const checkData = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
  if (!checkData.test(watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    }
  next();
};

module.exports = validDate;