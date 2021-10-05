const express = require('express');

const router = express.Router();

const readFileMiddleware = require('../middlewares/readFile');
const getTalkerById = require('../middlewares/getTalkerById');

router.get('/talker', readFileMiddleware);

router.get('/talker/:id', getTalkerById);

module.exports = router;
