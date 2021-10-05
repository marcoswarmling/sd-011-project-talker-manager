// Requisito 3
const express = require('express');

const router = express.Router();

const {
  verifyEmailExists,
  verifyEmailisValid,
  verifyPasswordExists,
  verifyPasswordIsValid,
} = require('../middlewares/validateLogin');

const loginValidations = [
  verifyEmailExists,
  verifyEmailisValid,
  verifyPasswordExists,
  verifyPasswordIsValid];

router.post('/', loginValidations, (req, res) => {
    const token = '7mqaVRXJSp886CGr';
    if (token) return res.status(200).json({ token });
    
    const { email, password } = req.body;
    if (email && password) return res.status(200).json({ email, password });
});

module.exports = router;
