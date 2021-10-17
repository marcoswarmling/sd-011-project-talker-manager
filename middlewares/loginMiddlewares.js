const authEmail = (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  const validEmail = /\S+@\S+\.com/.test(email);
  if (!validEmail) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
};

const authPassword = (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  const validPassword = password.length >= 6;
  if (!validPassword) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

const getLoginToken = (req, res) => {
  const rand = () => Math.random(0).toString(36).substr(2);
  const token = (rand() + rand()).substr(0, 16);
  res.status(200).json({ token });
};

module.exports = {
  getLoginToken,
  authEmail,
  authPassword,
};
