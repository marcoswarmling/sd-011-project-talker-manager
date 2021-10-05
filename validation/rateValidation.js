// Font: https://stackoverflow.com/questions/9011524/regex-to-check-whether-a-string-contains-only-numbers
const onlyStringNumbers = /^\d+$/;

const acceptableRange = (rate) => {
  if (rate < 1 || rate > 5) return false;
  return true;
};

const rateValidation = (req, res, next) => {
  const { talk } = req.body;
  const { rate } = talk;

  if (!rate && Number(rate) !== 0) {
    return res.status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  
  if (!onlyStringNumbers.test(rate) || !acceptableRange(rate)) {
    return res.status(400)
    .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

module.exports = rateValidation;