const express = require('express');

const router = express.Router();
const { createToken, validadeEmail, validadePassword } = require('../utils/utils.js');

router.use(createToken);

router.post('/', validadeEmail, validadePassword,
  (req, res) => {
  res.status(200).json({ token: `${req.newToken}` });
});

module.exports = router;
