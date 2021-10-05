const dataValidator = (data) => {
  const dataRegex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
  const validData = dataRegex.test(data);
  return validData;
};

const rateValidator = (rate) => {
  if (rate < 1 || rate > 5) {
    return false;
  }
  return true;
};

const checkFields = (talk) => {
  if (!talk || talk === '' || !talk.rate || !talk.watchedAt) {
    return false;
  }
  return true;
};

const validateTalk = (req, res, next) => {
  const { talk } = req.body;
  const fieldsCheck = checkFields(talk);
  if (!fieldsCheck) {
    return res.status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  const validDate = dataValidator(talk.watchedAt);
  if (!validDate) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  const validRate = rateValidator(talk.rate);
  if (!validRate) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

module.exports = validateTalk;