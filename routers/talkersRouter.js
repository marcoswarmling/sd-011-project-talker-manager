const express = require('express');

const router = express.Router();
const { readContentFile } = require('../helpers/readFile');

const PATH_FILE = './talker.json';

router.get('/', async (_req, res) => {
    const talkers = await readContentFile(PATH_FILE);

    if (talkers.length === 0) {
      return res.status(200).json([]);
    }

    return res.status(200).json(talkers);
});

module.exports = router;