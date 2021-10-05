const express = require('express');

const router = express.Router();

const readFileMiddleware = require('../middlewares/readFile');

router.get('/talker', readFileMiddleware);

module.exports = router;
