const router = require('express').Router();
const fs = require('fs');

const talkers = './talker.json';

router.get('/', (_req, res) => {
    const data = fs.readFileSync(talkers, 'utf-8');
    const results = JSON.parse(data);
     return res.status(200).json(results);
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const data = fs.readFileSync(talkers, 'utf-8');
    const results = JSON.parse(data);
    const Matchid = results.find((result) => result.id === Number(id));
    if (!Matchid) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    return res.status(200).json(Matchid);
});

module.exports = router;
