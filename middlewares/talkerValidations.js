const validator = require('validator');

const checkToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res
      .status(401)
      .json({ message: 'Token não encontrado' });
  }
  if (!(validator.isLength(token, { min: 16, max: 16 }))) {
    return res
      .status(401)
      .json({ message: 'Token inválido' });
  }
  next();
};

const checkName = (req, res, next) => {
  const { name } = req.body;
  if (!name || validator.isEmpty(name)) {
    return res
      .status(400)
      .json({ message: 'O campo "name" é obrigatório' });
  }
  if (!(validator.isLength(name, { min: 3, max: undefined }))) {
    return res
      .status(400)
      .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const checkAge = (req, res, next) => {
  const { age } = req.body;
  if (!age) {
    return res
    .status(400)
    .json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    return res
      .status(400)
      .json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
};

const checkTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk || !(talk.rate && talk.watchedAt)) {
    return res
      .status(400)
      .json({ 
        message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
      });
  }
  next();
};

const checkDate = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;
  if (!(validator.isDate(watchedAt, { format: 'DD/MM/YYYY' }))) {
    return res
      .status(400)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

const checkRate = (req, res, next) => {
  const { talk: { rate } } = req.body;
  const rateNumber = Number(rate);

  if (!(rateNumber >= 1 && rateNumber <= 5 && rateNumber % 1 === 0)) {
    return res
      .status(400)
      .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

module.exports = {
  checkToken,
  checkName,
  checkAge,
  checkTalk,
  checkDate,
  checkRate,
};
