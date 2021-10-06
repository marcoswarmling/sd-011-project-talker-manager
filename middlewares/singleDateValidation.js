const dataValidator = (data) => {
  const dataRegex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
  const validData = dataRegex.test(data);
  return validData;
};

const singleDateValidation = (req, res, next) => {
  const { watchedAt } = req.body.talk;
  const validDate = dataValidator(watchedAt);
  if (!validDate) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

module.exports = singleDateValidation;