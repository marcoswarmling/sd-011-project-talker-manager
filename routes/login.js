const router = require('express').Router();
const token = require('../middleware/token');
const { validatePassword, validateEmail } = require('../middleware/validateParams');

router.post('/', validateEmail, validatePassword, (_req, res) => res.status(200).json({ token }));

module.exports = router;