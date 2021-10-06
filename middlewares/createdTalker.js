function withOutName(req, res, next) {
  const { name } = req.body;

  if (!name || name.length === 0) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }

  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
}

function tokenValid(req, res, next) {
  const token = req.headers.authorization;

  if (token === '' || token === undefined) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }

  if (token.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }

  next();
}

function ageValid(req, res, next) {
  const { age } = req.body;

  if (!age || age.length === 0) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }

  if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
}

function rateInterval(rate, res) {
  if (rate < 1 || rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
}

function validWatchedAt(watchedAt, res) {
  const dateRgx = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
  const result = dateRgx.test(watchedAt);
  if (!result) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
}

function talkValid(req, res, next) {
  const { talk } = req.body;

  if (!talk) {
    return res.status(400)
      .json({ 
        message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }

  if (!talk.watchedAt || talk.rate === '' || talk.rate === undefined) {
    return res.status(400)
      .json({ 
        message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }

  rateInterval(talk.rate, res);
  validWatchedAt(talk.watchedAt, res);

  next();
}

module.exports = {
  withOutName,
  tokenValid,
  ageValid,
  talkValid,
};
