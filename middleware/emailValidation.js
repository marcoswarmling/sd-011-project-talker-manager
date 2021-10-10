const HTTP_BAD_REQUEST_STATUS = 400;

const verifyExistEmail = (email, status) => {
  if (!email || email === '') {
    return status(HTTP_BAD_REQUEST_STATUS).json({ message: 'O campo "email" é obrigatório' });
  }
};

const emailValidation = (req, res, next) => {
  const { status } = res;
  const { email } = req.body;
  const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;

  verifyExistEmail(email, status);

  if (!emailRegex.test(email)) {
    return status(HTTP_BAD_REQUEST_STATUS).json(
      { message: 'O "email" deve ter o formato "email@email.com"' },
    );
  }

  next();
};

module.exports = emailValidation;
