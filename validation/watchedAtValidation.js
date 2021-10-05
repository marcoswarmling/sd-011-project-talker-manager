// Font: https://stackoverflow.com/questions/9011524/regex-to-check-whether-a-string-contains-only-numbers
const onlyStringNumbers = /^\d+$/;

const dayValidation = (day) => {
  if (day.length !== 2 || !onlyStringNumbers.test(day) || Number(day) < 1 || Number(day) > 31) {
    return false;
  }
  return true;
};

const monthValidation = (month) => {
  if (month.length !== 2 || !onlyStringNumbers.test(month)
  || Number(month) < 1 || Number(month) > 12) {
    return false;
  }
  return true;
};

const yearValidation = (year) => {
  if (year.length !== 4 || !onlyStringNumbers.test(year) || Number(year) < 1) {
    return false;
  }
  return true;
};

const dataValidation = (day, month, year) => {
  if (!dayValidation(day) || !monthValidation(month) || !yearValidation(year)) return false;
  return true;
};

const validSizeDataValidation = (data) => {
  if (data.length !== 10) return false;
  return true;
};

const watchedAtValidation = (req, res, next) => {
  const { talk } = req.body;
  const { watchedAt } = talk;
  
  if (!watchedAt) {
    return res.status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  const splitedDate = watchedAt.split('/');
  const day = splitedDate[0];
  const month = splitedDate[1];
  const year = splitedDate[2];

  if (!validSizeDataValidation(watchedAt) || !dataValidation(day, month, year)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

module.exports = watchedAtValidation;