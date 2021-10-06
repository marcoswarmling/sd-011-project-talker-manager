const router = require('express').Router();
const validatedEmail = require('../middlewares/validEmail');
const validatedPassword = require('../middlewares/validPassword');

const validLogin = [validatedEmail, validatedPassword];

router.post('/', validLogin, (_req, res) => {
  res.status(200).json({ token: '7mqaVRXJSp886CGr' });
});

module.exports = router;