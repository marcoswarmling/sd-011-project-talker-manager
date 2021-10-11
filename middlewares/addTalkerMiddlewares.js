const HTTP_STATUS_400 = 400;
const HTTP_STATUS_401 = 401;

const tokenHandler = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || authorization === '') {
    return res.status(HTTP_STATUS_401).json({ message: 'Token não encontrado' });
  }
  
  if (authorization !== '7mqaVRXJSp886CGr') {
    return res.status(HTTP_STATUS_401).json({ message: 'Token inválido' });
  }

  next();
};

const nameHandler = (req, res, next) => {
  const { name } = req.body;

  if (!name || name === '') {
    return res.status(HTTP_STATUS_400).json({ message: 'O campo "name" é obrigatório' });
  }

  if (name.length < 3) {
    return res.status(HTTP_STATUS_400).json({
      message: 'O "name" deve ter pelo menos 3 caracteres',
    });
  }

  next();
};

const ageHandler = (req, res, next) => {
  const { age } = req.body;

  if (!age || typeof age !== 'number') {
    return res.status(HTTP_STATUS_400).json({
      message: 'O campo "age" é obrigatório',
    });
  }

  if (age < 18) {
    return res.status(HTTP_STATUS_400).json({
      message: 'A pessoa palestrante deve ser maior de idade',
    });
  }

  next();
};

const talkHandler = (req, res, next) => {
  const { talk } = req.body;

  if (!talk || !talk.watchedAt || !talk.rate) {
    return res.status(HTTP_STATUS_400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
  
  next();
};

const talkContentHandler = (req, res, next) => {
  const { talk: { watchedAt, rate } } = req.body;
  const dateRegex = /\d\d\/\d\d\/\d\d\d\d\b/;

  if (!dateRegex.test(watchedAt)) {
    return res.status(HTTP_STATUS_400).json({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  } if (rate > 5 || rate < 1) {
    return res.status(HTTP_STATUS_400).json({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }

  next();
};

module.exports = { tokenHandler, nameHandler, ageHandler, talkHandler, talkContentHandler };