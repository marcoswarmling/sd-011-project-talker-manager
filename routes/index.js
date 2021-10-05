const router = require('express').Router();
const { allSpeaker, findSpeaker } = require('../middlewares/index');

router.get('/talker', allSpeaker);

router.get('/talker/:id', findSpeaker);

module.exports = router;
