const express = require('express');

const router = express.Router();

const readFileMiddleware = require('../middlewares/readFile');
const getTalkerById = require('../middlewares/getTalkerById');
const validateLogin = require('../middlewares/validateLogin');
const validateCredentials = require('../middlewares/validateCredentials');
const tokenGenerator = require('../middlewares/tokenGenerator');

router.get('/talker', readFileMiddleware);

router.get('/talker/:id', getTalkerById);

router.post('/login', validateLogin, validateCredentials, tokenGenerator);

module.exports = router;
