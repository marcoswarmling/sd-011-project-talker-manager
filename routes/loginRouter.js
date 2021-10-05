const router = require('express').Router();

const isValidEmail = require('../middlewares/isValidEmail');
const isValidPassword = require('../middlewares/isValidPassword');

const HTTP_OK_STATUS = 200;

const isValidLogin = [isValidEmail, isValidPassword];

router.post('/', isValidLogin, (_req, res) => {
  res.status(HTTP_OK_STATUS).json({ token: '7mqaVRXJSp886CGr' });
});

module.exports = router;
