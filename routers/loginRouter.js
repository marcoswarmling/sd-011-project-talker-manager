const express = require('express');

const router = express.Router();

// task 3
const { createToken } = require('../utils/createToken');
const { valEmail } = require('../utils/validateEmail');
const { valPassword } = require('../utils/validatePassword');

router.use(createToken);

// status(200) = Success request

router.post('/', valEmail, valPassword,
    (req, res) => {
      res.status(200).json({ token: `${req.newToken}` });
});

module.exports = router;
