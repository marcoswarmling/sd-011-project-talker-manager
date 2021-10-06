const validName = (name, res) => {
  if (name) {
    if (name.length < 3) {
      return res.status(400).send({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    }
  } else {
    res.status(400).send({ message: 'O campo "name" é obrigatório' });
  }
};

const validAge = (age, res) => {
  const MINIMUM_AGE = 18;
  if (age) {
    if (age < MINIMUM_AGE) {
      return res.status(400).send({ message: 'A pessoa palestrante deve ser maior de idade' });
    }
  } else {
    res.status(400).send({ message: 'O campo "age" é obrigatório' });
  }
};

const validWatchedAt = (watchedAt, res) => {
  // Adaptado de https://regexland.com/regex-dates/
  const regexCheck = /^(0[1-9]|[12][0-9]|3[01])(\/)(0[1-9]|1[0-2])(\/)\d{4}$/;
  if (!regexCheck.test(watchedAt)) {
    return res.status(400).send({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  return true;
};

const validRate = (rate, res) => {
  if (rate < 1 || rate > 5) {
    return res.status(400).send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  return true;
};

const validTalkInfos = (talk, res) => {
  console.log('entrou');
  if (!talk || !talk.watchedAt || !talk.rate) {
    return res.status(400)
    .send({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  return true;
};

const validateBody = (req, res, next) => {
  const { name, age, talk } = req.body;
  validName(name, res);
  validAge(age, res);
  validTalkInfos(talk, res);
  validWatchedAt(talk.watchedAt, res);
  validRate(talk.rate, res);
  next();
};

module.exports = {
  validateBody,
};