const isEmailValid = (email) => /\S+@\S+\.\S+/.test(email);

const verifyPassword = (pw) => pw.length >= 6;

const checkEmailAndPassword = (email, password) => {
  if (!email || email === '') {
    return { message: 'O campo "email" é obrigatório' };
  }

  if (!password || password === '') {
    return { message: 'O campo "password" é obrigatório' };
  }
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const check = checkEmailAndPassword(email, password);
  if (check) return res.status(400).json(check);

  if (!isEmailValid(email)) {
    return res.status(400).json({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }
  if (!verifyPassword(password)) {
    return res.status(400).json({
      message: 'O "password" deve ter pelo menos 6 caracteres',
    });
  }
  next();
};

module.exports = validateLogin;