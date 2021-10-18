const authName = (name, res) => {
  if (!name) {
    res.status(400).json({ message: 'O campo "name" é obrigatório' });
  } else {
    const isValidName = name.length >= 3;
    if (!isValidName) {
      res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' })
    }
  }
};

const authAge = (age, res) => {
  if (!age) res.status(400).json({ message: 'O campo "age" é obrigatório' });

  const isValidAge = age >= 18;
  if (!isValidAge) {
    res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
};

const validRate = (rate, res) => {
  const isValidRate = (rate > 1 && rate <= 5) && Number.isInteger(rate);

  if (!isValidRate) {
    res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
};

const validWatchedAt = (watchedAt, res) => {
  // Reg valid DD/MM/YYYY https://stackoverflow.com/a/10194716
  const reg = /(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[012])[/](19|20)\d\d/;
  const isValidWatchedAt = reg.test(watchedAt);

  if (!isValidWatchedAt) {
    res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
};

const authTalk = (talk, res) => {
  const { rate, watchedAt } = talk || { rate: null, watchedAt: null };

  if (!talk || !('rate' in talk) || !('watchedAt' in talk)) {
    res.status(400).json({ 
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }

  validRate(rate, res);
  validWatchedAt(watchedAt, res);
};

const checkTalkers = (req, res, next) => {
  const { name, age, talk } = req.body;

  authName(name, res);
  authAge(age, res);
  authTalk(talk, res);

  next();
};

module.exports = checkTalkers;
