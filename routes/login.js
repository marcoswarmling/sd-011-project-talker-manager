const router = require('express').Router();

const { checkEmail, checkPassword } = require('../services/services');
const { tokenGenerator } = require('../services/services');

router.use(checkEmail);
router.use(checkPassword);

router.post('/', (_req, res) => {
  const token = tokenGenerator();
  res
    .status(200)
    .json({ token });
});

module.exports = router; 
