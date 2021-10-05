// https://stackoverflow.com/questions/6177975/how-to-validate-date-with-format-mm-dd-yyyy-in-javascript/49178339
const checkDate = (date) => {
  if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(date)) return false;
  // const splitedDate = date.split('/');
  // const day = Number(splitedDate[0]);
  // const month = Number(splitedDate[1]);
  // const year = Number(splitedDate[2]);
  // const checkYearAndMonth = year < 1000 || month <= 0 || month > 12
  // if (checkYearAndMonth) return false;
  // const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  // if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
  //   monthLength[1] = 29;
  // }
  // return day > 0 && day <= monthLength[month - 1];
  return true;
};

const validateToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'Token não encontrado' });
  if (token.length !== 16) return res.status(401).json({ message: 'Token inválido' });
  next();
};

const validateEmail = (req, res, next) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;
  if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

const validateName = (req, res, next) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  if (name.length <= 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const validateAge = (req, res, next) => {
  const { age } = req.body;
  if (!age) return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  if (Number(age) <= 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const validateWatchedAt = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;
  if (!checkDate(watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

const validateRate = (req, res, next) => {
  const { talk: { rate } } = req.body;
  const parsedRate = Number(rate);
  const validRate = parsedRate % 1 === 0 && parsedRate >= 1 && parsedRate <= 5;
  if (!validRate) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

// eslint-disable-next-line complexity
const validateTalk = (req, res, next) => {
  const { talk } = req.body;
  const message = 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios';
  if (!talk) return res.status(400).json({ message });
  const { rate, watchedAt } = talk;
  const validRateAndWatchedAt = (rate || rate === 0) && watchedAt;
  if (!validRateAndWatchedAt) return res.status(400).json({ message });
  next();
};

module.exports = { 
  validateToken,
  validateEmail,
  validatePassword,
  validateName,
  validateAge,
  validateWatchedAt,
  validateRate,
  validateTalk,
};
