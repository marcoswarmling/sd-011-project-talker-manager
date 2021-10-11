function validateEmail(req, res, next) {  
  const { email } = req.body;  
  const re = /\S+@\S+\.\S+/;
  const emailTest = re.test(email);
  
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  
  if (emailTest === false) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  next();
}

function validatePassword(req, res, next) {
  const { password } = req.body;
  
  if (!password) {
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
    return res.status(400).send({ message: 'O campo "name" é obrigatório' });
  }

  if (name.length < 3) {
    return res.status(400).send({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
}

function validateAge(req, res, next) {
  const { age } = req.body;

  if (!age || age === '') {
    return res.status(400).send({ message: 'O campo "age" é obrigatório' });
  }

  if (age < 18) {
    return res.status(400).send({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
}

function validateDateFormat(date) {
  const regexVerifyDate = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;
  const dateTested = regexVerifyDate.test(date);
  return dateTested;
}

// eslint-disable-next-line complexity
function validateTalk(req, res, next) {
  const { talk } = req.body;  
  if (!talk) {
    return res.status(400).send({ 
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });    
  }
  
  next();
}

function validateWatchedAt(req, res, next) {
  const { talk } = req.body;
  const { watchedAt } = talk;
  if (!watchedAt || watchedAt === '') {
    return res.status(400).send({ 
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }

  if (!validateDateFormat(watchedAt)) {
    return res.status(400).send({ 
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  next();
}

function validateRate(req, res, next) {
  const { talk } = req.body;
  const { rate } = talk;
  
  if (rate < 1 || rate > 5) {
    return res.status(400).send({ 
      message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  if (!rate || rate === '') {
    return res.status(400).send({ 
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    }); 
}    

  next();
}

function validateToken(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).send({ message: 'Token não encontrado' });
  }
  if (authorization.length < 16) {
    return res.status(401).send({ message: 'Token inválido' });
  }

  next();
}

module.exports = { 
  validateEmail, 
  validatePassword, 
  validateName, 
  validateAge, 
  validateTalk,
  validateToken,
  validateWatchedAt,
  validateRate,  
 };