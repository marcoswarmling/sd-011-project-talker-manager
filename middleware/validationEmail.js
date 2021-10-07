const HTTP_ERROR_STATUS = 400;

const emailValid = (req, res, next) => {
  const { email } = req.body;

  const format = (/\S+@\S+\.\S+/).test(email);

  if (!email || email === '') {
    return res.status(HTTP_ERROR_STATUS)
      .json({ message: 'O campo "email" é obrigatório' });
  }
  if (!format) {
    return res.status(HTTP_ERROR_STATUS)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
};

module.exports = emailValid;
