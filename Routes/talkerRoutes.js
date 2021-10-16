const router = require('express').Router();
const { getAllTalkers } = require('../controllers/talkerController');

router.get('/talker', getAllTalkers);

module.exports = router;