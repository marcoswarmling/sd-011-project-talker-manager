const fieldChecker = require('./fieldChecker');

// FONTE: Google, Course e exercícios do bloco.

function tokenValidator(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return next({ status: 401, message: 'Token não encontrado' });
  }

  if (authorization.length !== 16) return res.status(401).json({ message: 'Token inválido' });
  
  next();
}

function emailValidator(req, res, next) { 
    const { email } = req.body;

    const emailRegexp = new RegExp('\\S+@\\S+\\.\\S+');

    if (!email) {
        return next({ status: 400, message: 'O campo "email" é obrigatório' });
    }

    if (!emailRegexp.test(email)) {
        return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }

    next();
}

function pwValidator(req, res, next) {
  const { password } = req.body;

  if (!password) {
      return next({ status: 400, message: 'O campo "password" é obrigatório' });
  }

  if (password.length < 6) {
      return next({ status: 400, message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
}

function ageValidator(req, res, next) {
  const { age } = req.body;
  const validationMessage = 'A pessoa palestrante deve ser maior de idade';
  if (!age) return next({ status: 400, message: 'O campo "age" é obrigatório' });

  if (age < 18) return next({ status: 400, message: validationMessage });
  
  next();
}

function talkValidator(req, res, next) {
  const { talk } = req.body;
  const date = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
  const talkMessage = 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios';
  const dateMessage = 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"';
  const rateMessage = 'O campo "rate" deve ser um inteiro de 1 à 5';

    if (talk) {
      fieldChecker(400, rateMessage, next, talk.rate === 0); // rate validation
      fieldChecker(400, talkMessage, next, !talk.watchedAt || !talk.rate); // check if watchedAt and rate exists
      fieldChecker(400, dateMessage, next, !date.test(talk.watchedAt)); // watchedAt validation
      fieldChecker(400, rateMessage, next, !(talk.rate >= 1 && talk.rate <= 5)); // rate validation
      return next();
    }
  
  next({ status: 400, message: talkMessage });
}

function nameValidator(req, res, next) {
    const { name } = req.body;
    const validationMessage = 'O "name" deve ter pelo menos 3 caracteres';
 
    if (!name) return next({ status: 400, message: 'O campo "name" é obrigatório' });

    if (name.length < 3) return next({ status: 400, message: validationMessage });
    
    next();
}

module.exports = { 
  emailValidator,
  pwValidator,
  tokenValidator,
  nameValidator,
  ageValidator,
  talkValidator,
};