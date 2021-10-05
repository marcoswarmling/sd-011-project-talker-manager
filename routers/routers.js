const express = require('express');

const router = express.Router();

const readFileMiddleware = require('../middlewares/readFile');
const getTalkerById = require('../middlewares/getTalkerById');
const validateLogin = require('../middlewares/validateLogin');
const validateCredentials = require('../middlewares/validateCredentials');
const tokenGenerator = require('../middlewares/tokenGenerator');
const validateToken = require('../middlewares/validateToken');
const validateName = require('../middlewares/validateName');
const validateAge = require('../middlewares/validateAge');
const validateTalk = require('../middlewares/validateTalk');
const registerTalker = require('../middlewares/registerTalker');

router.get('/talker', readFileMiddleware);

router.get('/talker/:id', getTalkerById);

router.post('/login', validateLogin, validateCredentials, tokenGenerator);

router.post('/talker', validateToken, validateName, validateAge, validateTalk, registerTalker);

module.exports = router;
