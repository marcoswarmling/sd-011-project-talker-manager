const ageValidator = (req, res, next) => {
  const { age } = req.body;

  if (!age || age === '') return res.status(400).send({ message: 'O campo "age" é obrigatório' });

  if (age < 18) {
    return res.status(400).send({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
};

module.exports = { ageValidator };