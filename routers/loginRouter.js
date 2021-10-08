const router = require('express').Router();

const { isValidEmail, isValidPassword } = require('../middlewares/validations');

router.post('/login', isValidEmail, isValidPassword, (_req, res) => {
  res.status(200).json({ token: '7mqaVRXJSp886CGr' });
});

module.exports = router;
