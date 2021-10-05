const router = require('express').Router();
const { generateToken } = require('../fs-utils');
const { emailVal, passwordVal } = require('../middlewares/validations');

router.post('/', emailVal, passwordVal, (req, res) => {
  const token = generateToken();

  return res.status(200).json({ token });
});

module.exports = router;
