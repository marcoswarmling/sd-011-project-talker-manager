const router = require('express').Router();

const talkerCrontroller = require('../controllers/talker');

router.get('/', talkerCrontroller.getAllTalkers);
router.get('/:id', talkerCrontroller.getIdTalkers);

module.exports = router;
