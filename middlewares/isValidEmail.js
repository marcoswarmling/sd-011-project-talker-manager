const HTTP_BAD_REQUEST_STATUS = 400;

const isValidEmail = (req, res, next) => {
  const { email } = req.body;

  // para resolver a validacao do email, utilizei o seguinte material: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  const validateEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const validEmail = validateEmail.test(String(email).toLowerCase());

  if (!email) {
    return res.status(HTTP_BAD_REQUEST_STATUS).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!validEmail) {
    return res.status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'O "email" deve ter o formato "email@email.com' });
  }

  next();
};

module.exports = isValidEmail;
