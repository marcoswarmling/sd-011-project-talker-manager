const router = require('express').Router();

const autenticaEmail = require('./autenticaEmail');
const autenticaSenha = require('./autenticaSenha');

const autenticaLogin = [autenticaEmail, autenticaSenha];

router.post('/', autenticaLogin, (_req, res) => {
  res.status(200).json({ token: '7mqaVRXJSp886CGr' });
});

module.exports = router;