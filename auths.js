const crypto = require('crypto');

function generateToken() {
  return crypto.randomBytes(8).toString('hex');
}

function validateToken(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });
  if (authorization.length !== 16) return res.status(401).json({ message: 'Token inválido' });

  next();
}

function validateEmail(req, res, next) {
  const { email } = req.body;

  const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.([a-z]+))?$/i;

  if (!email || email === '') {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
    
  if (!regex.test(email)) {
    return res.status(400)
    .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  next();
}

function validatePassword(req, res, next) {
  const { password } = req.body;
  if (!password || password === '') {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
}

function validateName(req, res, next) {
  const { name } = req.body;

  if (!name || name === '') {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }

  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
}

function validateAge(req, res, next) {
  const { age } = req.body;

  if (!age || age === '') {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  
  if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
}

function validateRate(req, res, next) {
  const { talk } = req.body;

  if (!talk.rate || talk.rate === '') {
    return res.status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }

  if (Number.isInteger(talk.rate) !== true) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
}

function validateTalk(req, res, next) {
  const { talk } = req.body;

  if (!talk || talk === '') {
    return res.status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }

  next();
}

function validateWatchedAt(req, res, next) {
  const { talk } = req.body;

  if (!talk.watchedAt || talk.watchedAt === '') {
    return res.status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }

  next();
}

// regex de validação de data encontrado no seguinte link:
// https://stackoverflow.com/questions/5465375/javascript-date-regex-dd-mm-yyyy
function validateObjTalk(req, res, next) {
  const { talk } = req.body;
  const formatDate = /^[0-9]{2}\/{1}[0-9]{2}\/{1}[0-9]{4}$/g;

  if (!formatDate.test(talk.watchedAt)) {
    return res.status(400)
    .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  if (talk.rate < 1 || talk.rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
}
  
module.exports = {
  validateToken,
  validateEmail,
  validatePassword,
  generateToken,
  validateName,
  validateAge,
  validateRate,
  validateTalk,
  validateObjTalk,
  validateWatchedAt,
};
