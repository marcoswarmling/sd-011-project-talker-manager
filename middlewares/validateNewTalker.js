const validationToken = (req, res, next) => {
  const { token } = req.body;
  const tokenRegex = !/^[a-zA-Z0-9]{12}$/;

  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }

  if (tokenRegex.test(token)) {
    return res.status(401).json({ message: 'Token inválido' });
  }

  next();
};

const validationName = (req, res, next) => {
  const { name } = req.body;

  if (!name || name.length === 0) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }

  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
};

const validationAge = (req, res, next) => {
  const { age } = req.body;

  if (!age || age === '') {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }

  if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
};

const validationTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk || talk === '') {
    return res.status(400).json({ 
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }

  next();
};

const validationTalkChilds = (req, res, next) => {
  const { watchedAt, rate } = req.body;

  if (!watchedAt || !rate) {
    return res.status(400).json({ 
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }

  if (watchedAt) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  if (rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  next();
};

module.exports = { 
  validationToken, 
  validationName, 
  validationAge, 
  validationTalk, 
  validationTalkChilds };