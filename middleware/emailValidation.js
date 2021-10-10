const HTTP_BAD_REQUEST_STATUS = 400;

const emailValidation = (req, res, next) => {
  const { email } = req.body;
  const { status } = req;
  const emailRegex = /\S+@\S+\.\S+/;

  if (!email || email === '') {
    return status(HTTP_BAD_REQUEST_STATUS).json({ message: 'O campo "email" é obrigatório' });
  }

  if (!emailRegex.test(email)) {
    return status(HTTP_BAD_REQUEST_STATUS).json(
      { message: 'O "email" deve ter o formato "email@email.com"' },
    );
  }

  next();
};

module.exports = emailValidation;
