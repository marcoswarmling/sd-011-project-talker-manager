const express = require('express');

const router = express.Router();

// task 3
const { createToken } = require('../modules/createToken.js');
const { valEmail } = require('../modules/validateEmail.js');
const { valPassword } = require('../modules/validatePassword.js');

router.use(createToken);

// status(200) = Success request

router.post('/', valEmail, valPassword,
    (req, res) => {
      res.status(200).json({ token: `${req.newToken}` });
});

module.exports = router;
