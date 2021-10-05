const router = require('express').Router();

const { getTalkers } = require('../middlewares/validations');

router.get('/talker', getTalkers);

module.exports = router;