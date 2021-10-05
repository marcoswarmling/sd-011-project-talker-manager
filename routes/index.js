const router = require('express').Router();
const {
  allSpeaker,
  findSpeaker,
  verifyLogin,
} = require('../middlewares/index');

router.get('/talker', allSpeaker);

router.get('/talker/:id', findSpeaker);

router.post('/login', verifyLogin);

module.exports = router;
