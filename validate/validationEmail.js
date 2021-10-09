const validateEmail = (req, res, next) => {
  const { email } = req.body;
  // includes retorna true se uma string contém uma string especificada
  if (!email || email === '') {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!email.includes('@') || !email.includes('.com')) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
};

module.exports = validateEmail;
