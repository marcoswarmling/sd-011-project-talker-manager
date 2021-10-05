const express = require('express');
const fs = require('fs').promises;

const router = express.Router();

const talkersAll = async () => {
    const talkerFile = './talker.json';
    const talkers = await fs.readFile(talkerFile);
    return JSON.parse(talkers);
  };

router.get('/', async (req, res) => {
    const getTalker = await talkersAll();
res.status(200).send(getTalker);
});

module.exports = router;