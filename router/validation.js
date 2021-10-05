const router = require('express').Router();

const {
  getTalkers,
  getTalkerId,
 } = require('../middlewares/validation');

router.get('/talker', getTalkers);

router.get('/talker/:id', getTalkerId);