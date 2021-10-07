const router = require('express').Router();
const getTalkers = require('./getTalkers');
const search = require('./search');
const readToken = require('./readToken');

router.get('/talker', (_req, res) => {
    const talkers = getTalkers.read();
    return res.status(200).json(talkers);
});

router.get('/talker/search', readToken, search);

router.get('/talker/:id', (req, res) => {
    const { id } = req.params;
    const talkerId = getTalkers.findId(id);
    if (!talkerId) {
        return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    return res.status(200).json(talkerId);
});

module.exports = router;
