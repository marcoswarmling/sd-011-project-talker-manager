// Requisito 3 pt2
const express = require('express');

const router = express.Router();

const { checkEmail, checkPassword } = require('../midlewares/validateLogin');

const loginIsValid = [checkEmail, checkPassword];

router.post('/', loginIsValid, (req, res) => {
    const token = '7mqaVRXJSp886CGr';
    if (token) return res.status(200).json({ token });

    const { email, password } = req.body;
    if (email && password) return res.status(200).json({ email, password });
});

module.exports = { router };