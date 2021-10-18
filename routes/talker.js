const router = require('express').Router();
const fs = require('fs');

const talkers = './talker.json';

router.get('/', async (_req, res) => {
    const data = fs.readFileSync(talkers, 'utf-8');
    const results = JSON.parse(data);
     return res.status(200).json(results);
});

module.exports = router;
