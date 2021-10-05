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
  putTalker,
  deleteTalker,
  searchTalker,
} = require('../middleware/validation');

router.get('/talker', getTalker);
router.get('/talker/:id', getTalkerId);
router.post('/login', postLogin);
router.post('/talker', validToken, validName, validAge, validTalk, postTalker);
router.put('/talker/:id', validToken, validName, validAge, validTalk, putTalker);
router.delete('/talker/:id', validToken, deleteTalker);
router.get('/talker/search?q=searchTerm', validToken, searchTalker);

module.exports = router;
