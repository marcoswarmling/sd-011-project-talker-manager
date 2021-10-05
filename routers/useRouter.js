const router = require('express').Router();
const randonToken = require('random-token');

const {
  isValidEmail,
  isValidPassword,
} = require('../middlewares/validations');

router.post(
  '/login',
  isValidEmail,
  isValidPassword,
  (_req, res) => {
    const token = randonToken(16);
    res.status(200).json({ token });
  },
);

module.exports = router;