const checkToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }

  if (authorization.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }

  next();
};

const checkName = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });   
  }

  if (name.length <= 2) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });  
  }

  next();
};

const checkAge = (req, res, next) => {
  const { age } = req.body;

  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });   
  }

  if (Number(age) < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });  
  }

  next();
};

const checkTalk = (req, res, next) => {
  const { talk } = req.body;

  if (!talk || !talk.watchedAt) {
    return res.status(400)
  .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });   
  }

  next();
};

const checkRate = (req, res, next) => {
  const { talk } = req.body;
  const { rate } = talk;

  if (rate < 1 || rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });   
  }

  next();
};

const checkDateFormat = (req, res, next) => {
  const { talk } = req.body;
  const { watchedAt } = talk;
  const date = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;

  if (!date.test(watchedAt)) {
    return res.status(400)
    .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });   
  }

  next();
};

const checkedTalk = (req, res, next) => {
  const { talk } = req.body;
  const { watchedAt, rate } = talk;

  if (!watchedAt || !rate) {
    return res.status(400)
  .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });   
  }

  next();
};

module.exports = {
  checkAge, 
  checkName, 
  checkRate,
  checkTalk, 
  checkToken, 
  checkedTalk,
  checkDateFormat,
};
