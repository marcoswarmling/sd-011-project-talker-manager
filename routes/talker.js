const express = require('express');
const controllers = require('../controllers/talker');

const router = express.Router();

router.get('/talker', controllers.getTalkers);
router.get('/talker/:id', controllers.getTalker);

module.exports = router;