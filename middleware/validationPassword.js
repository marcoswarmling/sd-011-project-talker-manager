const HTTP_ERROR_STATUS = 400;

const passwordValid = async (req, res, next) => {
  const { password } = req.body;

  if (!password || password === '') {
    return res.status(HTTP_ERROR_STATUS)
      .json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(HTTP_ERROR_STATUS)
      .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

module.exports = passwordValid;
