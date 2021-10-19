// Requisito 4 pt3
function tokenIsValid(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }

  if (token.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }

  return next();
}

//

function nameIsValid(req, res, next) {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }

  if (name.length < 3) {
    return res
      .status(400)
      .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  return next();
}

//

function ageIsValid(req, res, next) {
  const { age } = req.body;

  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }

  if (age < 18) {
    return res
      .status(400)
      .json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  return next();
}

//

function talkIsValid(req, res, next) {
  const { talk } = req.body;

  if (!talk) {
    return res.status(400).json({
      message:
        'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }

  return next();
}

//

function validateDate(date) {
  return (
    date.split('/')[0].length !== 2
    || date.split('/')[1].length !== 2
    || date.split('/')[2].length !== 4
  );
}

function watchedAtIsValid(req, res, next) {
  const { talk } = req.body;

  if (!talk || !talk.watchedAt) {
    return res.status(400).json({
      message:
        'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }

  if (validateDate(talk.watchedAt)) {
    return res.status(400).json({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }

  return next();
}

//

function rateIsValid(req, res, next) {
  const { talk } = req.body;

  if (!talk || typeof talk.rate === 'undefined') {
    return res.status(400).json({
      message:
        'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }

  if (talk.rate < 1 || talk.rate > 5) {
    return res.status(400).json({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }

  return next();
}

module.exports = {
  tokenIsValid,
  nameIsValid,
  ageIsValid,
  talkIsValid,
  watchedAtIsValid,
  rateIsValid,
};
