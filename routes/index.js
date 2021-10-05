const router = require('express').Router();
const {
  allSpeaker,
  findSpeaker,
  verifyLogin,
  addTalker,
  verifyToken,
  verifyName,
  verifyAge,
  verifyTalkHate,
  verifyTalk,
} = require('../middlewares/index');

router.get('/talker', allSpeaker);

router.get('/talker/:id', findSpeaker);

router.post('/login', verifyLogin);

router.post('/talker', verifyToken, verifyName, verifyAge, verifyTalk, verifyTalkHate, addTalker);

module.exports = router;
