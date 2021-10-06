const router = require('express').Router();

const {
  searchTalk,
  deleteTalker,
  setEditTalker,
  setTalker,
} = require('../middleware/middleware');

const {
  getAllTalkers, 
  getTalkerById,
  validEmail,
  validPassword,
  getToken,
  validToken,
  validRate,
  validWatchedAt,
  validTalk,
  validAge,
  validName,
} = require('../middleware/validation');

router.get('/talker', getAllTalkers);
router.get('/talker/search', validToken, searchTalk);
router.get('/talker/:id', getTalkerById);
router.post('/login', validPassword, validEmail, getToken);
router.post('/talker', validToken, validTalk, validRate, validWatchedAt,
validAge,
validName,
setTalker);
router.put('/talker/:id', validTalk, validRate, validWatchedAt,
validAge,
validName, validToken, setEditTalker);
router.delete('/talker/:id', validToken, deleteTalker);

module.exports = router;