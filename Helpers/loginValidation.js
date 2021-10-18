const BAD_REQUEST = 400;
const minimumPasswordLength = 6;

const loginValidation = (req, res, next) => {
  const { email, password } = req.body;
  if (!email) return res.status(BAD_REQUEST).json({ message: 'O campo "email" é obrigatório' });
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(BAD_REQUEST)
    .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) {
    return res.status(BAD_REQUEST).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < minimumPasswordLength) {
    return res.status(BAD_REQUEST)
    .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

// Regex utilizado na validação de e-mail foi encontrado em https://stackoverflow.com/questions/201323/how-can-i-validate-an-email-address-using-a-regular-expression

module.exports = loginValidation;
