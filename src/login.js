const generateToken = (size) => {
  const allChars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let token = '';
  while (token.length < size) {
    const randomIndex = Math.floor(Math.random() * allChars.length);
    token += allChars[randomIndex];
  }
  return token;
}; 

const login = (req, res) => {
  const checkEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const { email, password } = req.body;
  const emailValid = checkEmail.test(email);
  if (!email) {
    return res.status(400).send({ message: 'O campo "email" é obrigatório' });
  }
  if (!emailValid) {
    return res.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) {
    return res.status(400).send({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(400).send({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  return res.status(200).json({ token: generateToken(16) });
};
  // console.log(generateToken(16));

  module.exports = login;
