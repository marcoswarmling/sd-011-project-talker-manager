const router = require('express').Router();
const getTalkers = require('./getTalkers');

router.get('/talker', (_req, res) => {
    const talkers = getTalkers.read();
    return res.status(200).json(talkers);
});

module.exports = router;