const router = require('express').Router();

const { checkEmail, checkPassword } = require('../middlewares/loginMiddleware');

// Adaptado de: https://qastack.com.br/programming/1349404/generate-random-string-characters-in-javascript
function tokenGenerator() {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < 16; i += 1) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

router.post('/', checkEmail, checkPassword, (_req, res) => {
  const token = tokenGenerator();

  res.status(200).json({ token });
});

module.exports = router;