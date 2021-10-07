const express = require('express');

const router = express.Router();
const { createToken, validateEmail, validatePassword } = require('./utils');

router.use(createToken);

router.post('/', validateEmail, validatePassword, (req, res) => {
  res.status(200).json({ token: `${req.newToken}` });
});

module.exports = router;
