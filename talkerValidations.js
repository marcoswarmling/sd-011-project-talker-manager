const fs = require('fs').promises;

const authValidation = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }

  const { authorization } = req.headers;

  if (authorization && authorization.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }

  next();
};

const nameValidation = (req, res, next) => {
  if (!req.body.name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }

  const { name } = req.body;

  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
};

const ageValidation = (req, res, next) => {
  if (!req.body.age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }

  const { age } = req.body;

  if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
};

const talkValidation = (req, res, next) => {
  if (!req.body.talk 
    || (!req.body.talk.rate && req.body.talk.rate !== 0) 
    || !req.body.talk.watchedAt) {
    return res.status(400)
      .json({ 
        message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
      });
  }

  next();
};

function dateParamCheck(stringDate) {
  const pattern = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
  return stringDate.match(pattern);
}

const talkPropertiesValidation = (req, res, next) => {
  const { rate, watchedAt } = req.body.talk; 

  if (rate < 1 || rate > 5 || !Number.isInteger(rate)) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  if (!dateParamCheck(watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  next();
};

const validateSearchTerm = async (req, res, next) => {
  if (!req.query.searchTerm || req.query.searchTerm === '') {
    const getTalkers = await fs.readFile('./talker.json', 'utf-8');
    return res.status(200).json(JSON.parse(getTalkers));
  }

  next();
};

module.exports = {
  authValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  talkPropertiesValidation,
  validateSearchTerm,
};
