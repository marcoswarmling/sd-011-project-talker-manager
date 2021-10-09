const express = require('express');

const router = express.Router();
const { createToken, valEmail, valPassword } = require('../utils/utils.js');

router.use(createToken);

router.post('/', valEmail, valPassword,
  (req, res) => {
  res.status(200).json({ token: `${req.newToken}` });
});

module.exports = router;
