function validateName(req, res, next) {
  const { name } = req.body;

  if (!name) return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
}

function validateAge(req, res, next) {
  const { age } = req.body;

  if (!age) return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
}

function validateTalk(req, res, next) {
  const { talk } = req.body;

  if (!talk) {
    return res.status(400).json({ message:
      'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  if (!talk.watchedAt) {
    return res.status(400).json({ message:
      'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  if (!talk.rate) {
    return res.status(400).json({ message:
      'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  next();
}

function validateRate(req, res, next) {
  const { talk } = req.body;
  const { rate } = talk;

  if (rate < 1 || rate > 5) {
    return res.status(400).json(
      { message: 'O campo "rate" deve ser um inteiro de 1 à 5' },
    );
  }

  next();
}

function validateDate(req, res, next) {
  const validDate = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;
  const { talk } = req.body;
  const { watchedAt } = talk;
  const dateTest = validDate.test(watchedAt);

  if (!dateTest) {
    return res.status(400)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  next();
}

module.exports = {
  validateName,
  validateAge,
  validateTalk,
  validateDate,
  validateRate,
};
