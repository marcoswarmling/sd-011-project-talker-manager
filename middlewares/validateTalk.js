function validateTalk(req, res, next) {
  const { talk } = req.body;

  if (!talk) {
    return res.status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }

  next(); 
}

function validateWatchedAt(req, res, next) {
  const { talk } = req.body;

  if (!talk.watchedAt) {
    return res.status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }

  if (
    talk.watchedAt.split('/')[0].length !== 2
    || talk.watchedAt.split('/')[1].length !== 2
    || talk.watchedAt.split('/')[2].length !== 4
  ) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  next(); 
}

function validateRate(req, res, next) {
  const { talk } = req.body;

  if (talk.rate < 1 || talk.rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  
  if (!talk.rate) {
    return res.status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }

  next(); 
}

module.exports = { validateTalk, validateWatchedAt, validateRate };