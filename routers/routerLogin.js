const router = require('express').Router();

const { randomToken } = require('../helpers/generateToken');
const { checkEmail } = require('../helpers/validateEmail');

router.post('/', (request, response) => {
  const { email, password } = request.body;
  if (!email) return response.status(400).json({ message: 'O campo "email" é obrigatório' });

  const checkedEmail = checkEmail(email);
  if (!checkedEmail) {
    return response.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  if (!password) return response.status(400).json({ message: 'O campo "password" é obrigatório' });

  if (password.split('').length < 6) {
    return response.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  const generatedToken = randomToken(16);

  response.status(200).json({ token: generatedToken });
});

module.exports = router;
