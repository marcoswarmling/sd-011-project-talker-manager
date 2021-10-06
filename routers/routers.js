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
const editTalker = require('../middlewares/editTalker');
const singleDateValidation = require('../middlewares/singleDateValidation');
const singleRateValidation = require('../middlewares/singleRateValidation');
const singleTalkValidation = require('../middlewares/singleTalkValidation');

router.get('/talker', readFileMiddleware);

router.get('/talker/:id', getTalkerById);

router.post('/login', validateLogin, validateCredentials, tokenGenerator);

router.post('/talker', validateToken, validateName, validateAge, validateTalk, registerTalker);

router.put('/talker/:id', validateToken, validateName, validateAge, 
singleTalkValidation, singleDateValidation, singleRateValidation, editTalker);

module.exports = router;
