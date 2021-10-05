const router = require('express').Router();
const {
  getTalker,
  getTalkerId,
  postLogin,
  validToken,
  validName,
  validAge,
  validTalk,
  postTalker,
} = require('../middleware/validation');

router.get('/talker', getTalker);
router.get('/talker/:id', getTalkerId);
router.post('/login', postLogin);
router.post('/talker', validName, validAge, validTalk, validToken, postTalker);

module.exports = router;
