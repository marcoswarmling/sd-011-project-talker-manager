function validateEmail(req, res, next) {
  const { email } = req.body;

  if (!email || email === '') {
    return res.status(400).json({
      message: 'O campo "email" é obrigatório',
    });
  }

  const validEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.([a-z]+))?$/i;
  const verify = validEmail.test(email);
  if (!verify) {
    return res.status(400).json({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }
  next();
}

module.exports = { validateEmail };
