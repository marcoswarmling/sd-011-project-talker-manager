const { isValid, getInvalidMessage } = require('../helpers/utils');

const talkerValidator = (req, res, next) => {
  const { name, age, talk } = req.body;
  if (!talk) {
    return res.status(400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }

  const { watchedAt, rate } = talk;
  const validations = { name, age, watchedAt, rate };
  Object.entries(validations).forEach(([key, value]) => {
    if (!isValid(key, value)) {
      return res.status(400).json({ message: getInvalidMessage(key, value) });
    }
  });

  next();
};

module.exports = talkerValidator;
