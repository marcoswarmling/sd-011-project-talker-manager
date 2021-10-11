const crypto = require('crypto');

const genToken = () => crypto.randomBytes(8).toString('hex'); // double

function validateLogin(req, res, next) {
  const { email, password } = req.body;
  const regex = /^[a-z0-9._]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  const validEmail = regex.test(email); // return true or false and its async

  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  if (!validEmail) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  } // regex is async, for this reason its the last if. 
  next();
}

function validateToken(req, res, next) {
  const { authorization } = req.headers;
  const regex = /^[\w]{16}$/i;
  const validToken = regex.test(authorization); // retorna true or false

  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (!validToken) {
    return res.status(401).json({ message: 'Token inválido' });
  } 
  next();
}

function validateName(req, res, next) {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
}

function validateAge(req, res, next) {
  const { age } = req.body;
  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
}

function validateTalk(req, res, next) {
  const { talk } = req.body;
  // console.log(talk);
  if (!talk) {
    return res.status(400).json(
      { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' },
    );
  }
  next();
}

function validateRate(req, res, next) {
  const { talk } = req.body;
  if (talk.rate < 1 || talk.rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
 }
 if (!talk.rate) {
   return res.status(400).json(
     { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' },
  );
 }
 next();
}

function validateDate(req, res, next) {
  const { talk: { watchedAt } } = req.body;
  const regexWatchedAt = /^\d{2}\/\d{2}\/\d{4}$/; // formato da data
  const validDate = regexWatchedAt.test(watchedAt);
  if (watchedAt === undefined) {
    return res.status(400).json(
      { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' },
    );
  }
  if (!validDate) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
   }
   next();
}

module.exports = { 
  validateLogin,
  genToken,
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateDate,
  validateRate,
};
