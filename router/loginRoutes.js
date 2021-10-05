const router = require('express').Router();

const {
  validateEmail,
  validatePassword,
} = require('../middlewares/validateLogin');

router.post(
  '/',
  validateEmail,
  validatePassword,
  (_req, res) => {
    res.status(200).json({ token: '7mqaVRXJSp886CGr' });
  },
);

module.exports = router;