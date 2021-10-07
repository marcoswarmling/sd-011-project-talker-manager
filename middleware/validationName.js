const HTTP_ERROR_STATUS = 400;

const nameValid = (req, res, next) => {
  const { name } = req.body;

  if (!name || name.length === 0) {
    return res.status(HTTP_ERROR_STATUS)
      .json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(HTTP_ERROR_STATUS)
      .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

module.exports = nameValid;
