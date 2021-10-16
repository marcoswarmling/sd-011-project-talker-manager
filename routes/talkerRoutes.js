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

const router = express.Router();

router.get('/', Talker.getAllTalkers);
router.get('/:talkerId', Talker.getTalkerById);
router.post('/', postTalkerValidations, Talker.postTalker);

module.exports = router;