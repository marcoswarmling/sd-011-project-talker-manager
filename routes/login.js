const router = require('express').Router();
const crypto = require('crypto');
const validatedEmail = require('../middlewares/validEmail');
const validatedPassword = require('../middlewares/validPassword');

const tokenLength = 8;

const validLogin = [validatedEmail, validatedPassword];

// Feito com a ajuda do PH Assis;
const tokenValue = crypto.randomBytes(tokenLength).toString('hex');

router.post('/', validLogin, (_req, res) => {
  res.status(200).json({ token: tokenValue });
});

module.exports = router;
