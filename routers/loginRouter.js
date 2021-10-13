const router = require('express').Router();

const genRandomToken = () => 
  // adaptado de https://stackoverflow.com/questions/10726909/random-alpha-numeric-string-in-javascript
   (
    Math.random().toString(36).slice(2)
    .slice(0, 16) + Math.random().toString(36)
      .slice(2).slice(0, 16)
  ).slice(4, 20);

  const { validateEmail, validatePassword } = require('../middleware/loginMiddleware');

router.post('/', validateEmail, validatePassword, (req, res) => {
  const token = genRandomToken();

  res.status(200).json({ token });
});

module.exports = router;
