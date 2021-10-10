const HTTP_BAD_REQUEST_STATUS = 400;

const ageValidation = (req, res, next) => {
  const MINIMUM_AGE = 18;
  const { age } = req.body;

  if (!age || age === '') {
    return res.status(HTTP_BAD_REQUEST_STATUS).json({ message: 'O campo "age" é obrigatório' });
  }

  if (age < MINIMUM_AGE) {
    return res.status(HTTP_BAD_REQUEST_STATUS).json(
      { message: 'A pessoa palestrante deve ser maior de idade' },
    );
  }

  next();
};

module.exports = ageValidation;
