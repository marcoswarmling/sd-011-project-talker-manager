const HTTP_BAD_REQUEST_STATUS = 400;

const emailExistAndNotBlank = (email, req) => {
  if (!email || email === '') {
    return req.status(HTTP_BAD_REQUEST_STATUS).json({ message: 'O campo "email" é obrigatório' });
  }
};

const emailValidation = (req, res, next) => {
  const { email } = req.body;
  const emailRegex = /\S+@\S+\.\S+/;

  emailExistAndNotBlank(email, req);

  if (!emailRegex.test(email)) {
    return req.status(HTTP_BAD_REQUEST_STATUS).json(
      { message: 'O "email" deve ter o formato "email@email.com"' },
    );
  }

  next();
};

module.exports = emailValidation;
