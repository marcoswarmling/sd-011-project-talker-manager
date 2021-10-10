const HTTP_BAD_REQUEST_STATUS = 400;

const emailExistAndNotBlank = (email, status) => {
  if (!email || email === '') {
    return status(HTTP_BAD_REQUEST_STATUS).json({ message: 'O campo "email" é obrigatório' });
  }
};

const emailValidation = (req, res, next) => {
  const { email } = req.body;
  const { status } = res;
  const emailRegex = /\S+@\S+\.\S+/;

  emailExistAndNotBlank(email, status);

  if (!emailRegex.test(email)) {
    return status(HTTP_BAD_REQUEST_STATUS).json(
      { message: 'O "email" deve ter o formato "email@email.com"' },
    );
  }

  next();
};

module.exports = emailValidation;
