const express = require('express');
// const getFile = require('../helpers/fs-utils');
const generateToken = require('../helpers/generateToken');

const { validateEmail, validatePassword } = require('../middlewares');

const router = express.Router();

router.post('/', validateEmail, validatePassword, (_req, res) => {
  const token = generateToken();
  res.status(200).json({ token });
});

module.exports = router;