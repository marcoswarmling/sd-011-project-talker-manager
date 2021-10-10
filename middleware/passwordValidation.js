const HTTP_BAD_REQUEST_STATUS = 400;

const verifyExistPassword = (password, status) => {
  if (!password || password === '') {
    return status(HTTP_BAD_REQUEST_STATUS).json(
      { message: 'O campo "password" é obrigatório' },
    );
  }
};

const passwordValidation = (req, res, next) => {
  const LENGTH_PASSWORD = 6;
  const { status } = res;
  const { password } = req.body;

  verifyExistPassword(password, status);

  if (password.length < LENGTH_PASSWORD) {
    return status(HTTP_BAD_REQUEST_STATUS).json(
      { message: 'O "password" deve ter pelo menos 6 caracteres' },
    );
  }

  next();
};

module.exports = passwordValidation;
