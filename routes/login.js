const router = require('express').Router();
const checkEmail = require('../middlewares/checkEmail');
const checkPassword = require('../middlewares/checkPassword');

const checkLogin = [checkEmail, checkPassword];

router.post('/login', checkLogin, (_req, res) => {
  res.status(200).json({ token: '7mqaVRXJSp886CGr' });
});

module.exports = router;
