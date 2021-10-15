const express = require('express');
const Talker = require('../middlewares/talkersMiddlewares');

const router = express.Router();

router.get('/', Talker.getAllTalkers);

module.exports = router;