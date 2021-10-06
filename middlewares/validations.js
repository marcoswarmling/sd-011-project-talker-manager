const isValidEmail = (req, res, next) => {
  const { email } = req.body;
  const si = /\S+@\S+\.\S+/;
  const validEmail = si.test(email);
 
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  } if (!validEmail) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
};

const isValidPassword = (req, res, next) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
    if (password.length < 6) {
      return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    }
  next();
};

const isValidToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (token === '' || token === undefined) {
    return res.status(401).json({ message: 'Token não encontrado' });
  } if (token.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  next(); 
};

const isValidName = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  } 
  next(); 
};

const isValidAge = (req, res, next) => {
  const { age } = req.body;
  if (!age || age.length === 0) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (Number(age) < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  } 
  next(); 
};

const isValidRate = (req, res, next) => {
  const { talk: { rate } } = req.body;
  if ((!rate && rate === 0) || rate < 1 || rate > 5) {
    return res.status(400).json({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }
  next();
};

const isValidWatchedAt = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;
  const date = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
  const dateRegex = date.test(watchedAt);
  if (!dateRegex) {
    return res.status(400).json({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }
  next();
};

const isValidTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk || !talk.watchedAt || (!talk.rate && talk.rate !== 0)) {
    return res.status(400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
  next(); 
};

module.exports = {
  isValidTalk,
  isValidRate,
  isValidWatchedAt,
  isValidAge,
  isValidName,
  isValidToken,
  isValidEmail,
  isValidPassword,
};