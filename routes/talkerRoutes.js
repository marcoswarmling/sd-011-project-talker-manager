const express = require('express');
const Talker = require('../middlewares/talkersMiddlewares');

const Validations = require('../middlewares/validations');

const postTalkerValidations = [
  Validations.isValidToken,
  Validations.isValidName,
  Validations.isValidAge,
  Validations.isValidTalk,
  Validations.isValidWatchedAt,
  Validations.isValidRate,
];

const putTalkerValidations = [
  Validations.isValidToken,
  Validations.isValidName,
  Validations.isValidAge,
  Validations.isValidTalk,
  Validations.isValidWatchedAt,
  Validations.isValidRate,
];

const router = express.Router();

router.get('/', Talker.getAllTalkers);
router.get('/search', Validations.isValidToken, Talker.getTalkerBySearch);
router.get('/:talkerId', Talker.getTalkerById);
router.post('/', postTalkerValidations, Talker.postTalker);
router.put('/:talkerId', putTalkerValidations, Talker.putTalker);
router.delete('/:talkerId', Validations.isValidToken, Talker.deleteTalker);

module.exports = router;