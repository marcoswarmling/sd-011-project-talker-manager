const {
  validateName,
  validateWatchedAt,
  validateRate,
} = require('./validations');

function checkExistingTalkerData(req, res, next) {
  const { name, age, talk = {} } = req.body;
  const { watchedAt, rate } = talk;

  if (!name) return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  if (!age) return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  if (watchedAt === undefined || rate === undefined) {
    return res
      .status(400)
      .json({
        message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
      });
  }

  next();
}

function validateTalker(req, res, next) {
  const { name, age } = req.body;
  try {
    if (!validateName(name)) throw new Error('O "name" deve ter pelo menos 3 caracteres');
    if (Number(age) < 18) throw new Error('A pessoa palestrante deve ser maior de idade');
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }

  next();
}

function validateTalk(req, res, next) {
  const { talk: { watchedAt, rate } } = req.body;
  try {
    if (!validateWatchedAt(watchedAt)) {
      throw new Error('O campo "watchedAt" deve ter o formato "dd/mm/aaaa"');
    }
    if (!validateRate(rate)) throw new Error('O campo "rate" deve ser um inteiro de 1 à 5');
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }

  next();
}

module.exports = [
  checkExistingTalkerData,
  validateTalker,
  validateTalk,
];
