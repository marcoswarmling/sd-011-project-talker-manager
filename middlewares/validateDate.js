const validateDate = (req, res, next) => {
  const { talk } = req.body;
  console.log(talk);
  const dateFormat = /[0-9]+\/[0-9]+\/[0-9]/;
  if (!dateFormat.test(talk.watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

module.exports = validateDate;
