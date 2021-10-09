const validateAge = (req, res, next) => {
  const { age } = req.body;
  const MINIMUM_AGE = 18;
  if (!age || age === '') return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  if (age < MINIMUM_AGE) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

module.exports = validateAge;