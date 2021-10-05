const express = require('express');
const { login } = require('../controllers/user');

const router = express.Router();

router.post('/login', (req, res, next) => {
  login(req.body)
    .then(res.status(200).json)
    .catch(next);
});

module.exports = router;
