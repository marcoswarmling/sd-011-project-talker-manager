const express = require('express');

const router = express.Router();

// task 3
const { createToken, valEmail, valPassword } = require('../utils/utils.js');

router.use(createToken);

// status(200) = Success request

router.post('/', valEmail, valPassword,
    (req, res) => {
      res.status(200).json({ token: `${req.newToken}` });
});

module.exports = router;
