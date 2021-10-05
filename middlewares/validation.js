const router = require('express').Router();

const {
  getTalkers,
  getTalkerId,
 } = require('../router/validation');

router.get('/talker', getTalkers);

router.get('/talker/:id', getTalkerId);