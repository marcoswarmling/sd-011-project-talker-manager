const HTTP_ERROR_STATUS = 400;

const ageValid = (req, res, next) => {
  const { age } = req.body;

  if (!age || typeof age === 'number') {
    return res.status(HTTP_ERROR_STATUS)
      .json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    return res.status(HTTP_ERROR_STATUS)
      .json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

module.exports = ageValid;
