const router = require('express').Router();
const rescue = require('express-rescue');
const { emailValidator, pwValidator } = require('../utils/validators');
const tokenGen = require('../utils/tokenGen');

router.post('/', emailValidator, pwValidator, rescue((req, res) => {
    const token = tokenGen(8);
    res.status(200).json({ token });
}));

module.exports = router;
