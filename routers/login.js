const router = require('express').Router();
const generateToken = require('../middlewars/token');

const { validaEmail, validaPassword } = require('../middlewars/talker');

router.post('/', validaEmail, validaPassword, (_req, res) =>
  res.status(200).json({ token: generateToken() }));

module.exports = router;
