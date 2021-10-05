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
  alterTalker,
  removeTalker,
} = require('../middlewares/index');

router.get('/talker', allSpeaker);

router.get('/talker/:id', findSpeaker);

router.post('/login', verifyLogin);

router.post('/talker', verifyToken, verifyName, verifyAge, verifyTalk, verifyTalkHate, addTalker);

router.put('/talker/:id',
verifyToken, verifyName, verifyAge, verifyTalk, verifyTalkHate, alterTalker);

router.delete('/talker/:id', verifyToken, removeTalker);

module.exports = router;
