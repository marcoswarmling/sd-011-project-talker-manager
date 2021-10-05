const emailValidation = (req, res, next) => {
  const { email } = req.body;

  // Font: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  const re = /\S+@\S+\.\S+/;
  const validation = re.test(String(email).toLowerCase());

  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  if (!validation) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  next();
};

module.exports = emailValidation;