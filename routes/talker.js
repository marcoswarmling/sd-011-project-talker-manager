const express = require('express');
const controllers = require('../controllers/talker');

const router = express.Router();

router.get('/', controllers.getTalkers);

module.exports = router;