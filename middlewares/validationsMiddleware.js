const {
  validateToken,
  validateName,
  validateAge,
  validateWatchedAt,
  validateRate,
  validateTalk,
} = require('../helper/validationHelpers');

const validateData = (req, res, next) => {
  const { email, password } = req.body;

  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });

  if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });

  next();
};

const checkToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (validateToken(token) === false) {
    return res.status(401).json({ message: 'Token inválido' });
  }

  if (validateToken(token) === null) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }

  next();
};

const checkName = (req, res, next) => {
  const { name } = req.body;

  if (validateName(name) === false) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  if (validateName(name) === null) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }

  next();
};

const checkAge = (req, res, next) => {
  const { age } = req.body;

  if (validateAge(age) === false) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  if (validateAge(age) === null) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }

  next();
};

const checkTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!validateTalk(talk)) {
    return res.status(400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }

  next();
};

const checkWatchedAt = (req, res, next) => {
  const { talk } = req.body;

  if (!validateWatchedAt(talk.watchedAt)) {
    return res.status(400).json({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }

  next();
};

const checkRate = (req, res, next) => {
  const { talk } = req.body;
  if (!validateRate(talk)) {
    return res.status(400).json({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }

  next();
};

module.exports = {
  validateData,
  checkAge,
  checkName,
  checkRate,
  checkTalk,
  checkToken,
  checkWatchedAt,
};
