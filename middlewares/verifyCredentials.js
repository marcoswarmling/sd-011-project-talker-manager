const verifyEmail = (req, res, next) => {
  const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      message: 'O campo "email" é obrigatório',
    });
  }

  if (!email.match(pattern)) {
    return res.status(400).json({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }
  next();
};

const verifyPassword = (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({
      message: 'O campo "password" é obrigatório',
    });
  }
  const pass = password.toString();
  if (pass.length < 6) {
    return res.status(400).json({
      message: 'O "password" deve ter pelo menos 6 caracteres',
    });
  }
  next();
};
module.exports = {
  verifyEmail,
  verifyPassword,
};