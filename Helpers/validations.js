const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const minimumTokenLength = 16;
const minNameLength = 3;
const minAge = 18;

const tokenValidation = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(UNAUTHORIZED).json({ message: 'Token não encontrado' });
  if (token.length !== minimumTokenLength) {
    return res.status(UNAUTHORIZED).json({ message: 'Token inválido' });
  }
  next();
};

const nameValidation = (req, res, next) => {
  const { name } = req.body;
  if (!name) return res.status(BAD_REQUEST).json({ message: 'O campo "name" é obrigatório' });
  if (name.length < minNameLength) {
    return res.status(BAD_REQUEST).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const ageValidation = (req, res, next) => {
  const { age } = req.body;
  if (!age) return res.status(BAD_REQUEST).json({ message: 'O campo "age" é obrigatório' });
  if (age < minAge) {
    return res.status(BAD_REQUEST)
    .json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const talkValidation = (req, res, next) => {
  const { talk } = req.body;
  if (!talk) {
    return res.status(BAD_REQUEST)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  next();
};

const rateValidation = (req, res, next) => {
  const { talk: { rate } } = req.body;
  if (rate < 1 || rate > 5) {
    return res.status(BAD_REQUEST).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  if (!rate) {
    return res.status(BAD_REQUEST)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  next();
};

const dateValidation = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;
  const date = /^[0-9]{2}[/][0-9]{2}[/][0-9]{4}$/.test(watchedAt); // // Regex utilizado encontrodo em: https://stackoverflow.com/questions/5465375/javascript-date-regex-dd-mm-yyyy
  if (!watchedAt) {
    return res.status(BAD_REQUEST)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  if (!date) {
    return res.status(BAD_REQUEST)
    .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

const validations = [
  tokenValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  rateValidation,
  dateValidation,
];

module.exports = validations;