const router = require('express').Router();

const { getTalkers } = require('../router/validation');

router.get('/talker', getTalkers);