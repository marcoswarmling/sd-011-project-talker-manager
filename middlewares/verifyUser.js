const tokenValidation = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }

  if (authorization.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }

  next();
};

const nameValidation = (req, res, next) => {
  const { name } = req.body;

  // Para nome
  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length <= 2) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }  
  next();
};

const ageValidation = (req, res, next) => {
  const { age } = req.body;

  // Para idade
  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (Number(age) < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const verifyExistsTalk = (req, res, next) => {
  const { talk } = req.body;

  if (!talk || !talk.watchedAt) {
    return res.status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  next();
};

const rateValidation = (req, res, next) => {
  const { talk } = req.body;
  const { rate } = talk;

  // Para tempo palestra
  if (rate < 1 || rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

const talkValidation = (req, res, next) => {
  const { talk } = req.body;
  const { watchedAt } = talk;

  // https://stackoverflow.com/questions/15491894/regex-to-validate-date-formats-dd-mm-yyyy-dd-mm-yyyy-dd-mm-yyyy-dd-mmm-yyyy
  const dataFormat = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;

  // Para tempo palestra
  if (!dataFormat.test(watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

const propertiesVerify = (req, res, next) => {
  const { talk } = req.body;
  const { watchedAt, rate } = talk;

  // https://eslint.org/docs/rules/no-prototype-builtins
  // const hasWatchedAt = 'watchedAt' in talk;
  // const hasRate = 'rate' in talk;

  if (!watchedAt || !rate) {
    return res.status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  next();
};

module.exports = {
  tokenValidation,
  nameValidation,
  ageValidation,
  verifyExistsTalk,
  rateValidation,
  talkValidation,
  propertiesVerify,
};