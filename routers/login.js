const router = require('express').Router();
const { checkEmail, checkPassword } = require('../middlewares/checkLogin');
const { tokenGenerator } = require('../services/loginServices');

router.use(checkEmail);
router.use(checkPassword);

router.post('/', (_req, res) => {
  const token = tokenGenerator();
  res
    .status(200)
    .json({ token });
});

module.exports = router;