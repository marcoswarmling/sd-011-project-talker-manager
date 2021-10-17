const router = require('express').Router();

const talkers = '../talker.json';
const { readJson } = '../Services/talkerFile.js';

router.get('/', async (_req, res) => {
    const file = await readJson(talkers);
    return res.status(200).json(file);
});

module.exports = router;