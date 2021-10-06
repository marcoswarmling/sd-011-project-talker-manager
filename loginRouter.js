const express = require('express');

const router = express.Router();

const mid = require('./middlewares');

router.post('/', mid.getToken);

module.exports = router;