const express = require('express');

const router = express.Router();

const validateCredentials = require('./validateCredentials');
const tokenGenerator = require('./tokenGenerator');

router.post('/', validateCredentials, (_req, res) => {
  const getToken = tokenGenerator(8);

  return res.status(200).json({ token: getToken });
});

module.exports = router;