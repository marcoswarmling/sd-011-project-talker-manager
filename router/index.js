const router = require('express').Router();

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
  setTalker,
} = require('../middlewares/validation');

router.get('/talker', getAllTalkers);
router.get('/talker/:id', getTalkerById);
router.post('/login', validPassword, validEmail, getToken);
router.post('/talker', validToken, validTalk, validRate, validWatchedAt,
validAge,
validName,
setTalker);

module.exports = router;