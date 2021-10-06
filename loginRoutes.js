const router = require('express').Router();
const tokenGen = require('./utilityFunctions/tokenGen');
const validateLogin = require('./middleware/validateLogin');

router.post('/', validateLogin, (req, res) => {
  const randomToken = tokenGen();
  res.status(200).json({ token: randomToken });
});

module.exports = router;
