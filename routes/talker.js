const router = require('express').Router();

const talkerCrontroller = require('../controllers/talker');

router.get('/', talkerCrontroller.getAllTalkers);
router.get('/:id', talkerCrontroller.getIdTalkers);
router.post('/', 
  talkerCrontroller.validateToken,
  talkerCrontroller.validateName,
  talkerCrontroller.validateAge,
  talkerCrontroller.validateTalk,
  talkerCrontroller.validateWatchedAt,
  talkerCrontroller.validateRate,
  talkerCrontroller.addTalker);

module.exports = router;
