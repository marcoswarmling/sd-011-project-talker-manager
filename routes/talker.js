const router = require('express').Router();

const talkerCrontroller = require('../controllers/talker');

router.get('/', talkerCrontroller.getAllTalkers);

module.exports = router;
