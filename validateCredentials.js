function validateCredentials(req, res) {
  const emailModel = /^[a-zA-Z0-9._]*@email.com$/i;
  const passMinLength = 6;
  const { email, password } = req.body;

  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < passMinLength) {
    return res.status(400)
      .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  if (!emailModel.test(email)) {
    return res.status(400)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
}

module.exports = validateCredentials;
