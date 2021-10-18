const router = require('express').Router();
const fs = require('fs');

const talkers = './talker.json';

router.get('/', async (_req, res) => {
    const data = fs.readFileSync(talkers, 'utf-8');
    const results = JSON.parse(data);
     return res.status(200).json(results);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const data = fs.readFileSync(talkers, 'utf-8');
    const results = JSON.parse(data);
    const Matchid = results.find((result) => result.id === Number(id));
    return res.status(200).json(Matchid);
});

module.exports = router;
