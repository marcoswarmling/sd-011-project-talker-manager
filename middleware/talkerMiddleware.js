const verifyToken = (req, res, next) => {
  const { authorization: token } = req.headers;

  if (!token) return res.status(401).json({ message: 'Token não encontrado' });

  if (token.length < 16) return res.status(401).json({ message: 'Token inválido' });

  next();
};

const verifyName = (req, res, next) => {
  const { name } = req.body;

  if (!name) return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
};

const verifyAge = (req, res, next) => {
  const { age } = req.body;

  if (!age) return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  
  if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  
  next();
};

const verifyTalk = (req, res, next) => {
  const { talk } = req.body;
  
  if (!talk || !((talk.rate === 0 || talk.rate) && talk.watchedAt)) {
    return res.status(400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }

  next();
};

const verifyRate = (req, res, next) => {
  const { talk: { rate } } = req.body;

  // if (!rate) {
  //   return res.status(400).json({
  //     message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
  //   });
  // }

  if (rate > 5 || rate < 1) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

const verifyWatchedAt = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;
  const regex = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;

  // if (!watchedAt) {
  //   return res.status(400).json({
  //     message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
  //   });
  // }

  if (!regex.test(watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

module.exports = {
  verifyToken,
  verifyName,
  verifyAge,
  verifyTalk,
  verifyRate,
  verifyWatchedAt,
};