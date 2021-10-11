function testEmailRegex(email) {
  const regex = /\S+@\S+\.\S+/;
  return regex.test(email);
}

const validateEmail = (req, res, next) => {
  const { email } = req.body;

  if (!email || email === '') {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }

  if (!testEmailRegex(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  next();
};

module.exports = validateEmail;