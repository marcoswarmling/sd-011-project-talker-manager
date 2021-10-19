const router = require('express').Router();

const talkerCrontroller = require('../controllers/talker');

router.get('/', talkerCrontroller.getAllTalkers);
router.get('/:id', talkerCrontroller.getIdTalkers);
router.post('/', 
  talkerCrontroller.tokenValid,
  talkerCrontroller.nameValid,
  talkerCrontroller.ageValid,
  talkerCrontroller.watchedAtValid,
  talkerCrontroller.rateValid,
  talkerCrontroller.talkValid,
  talkerCrontroller.addTalker);

module.exports = router;
