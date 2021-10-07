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

router.get('/:id', async (req, res) => {
  const talkers = await readContentFile(PATH_FILE);
  const { id } = req.params;
  const talker = talkers.find((item) => item.id === Number(id));

    if (!talker) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }

    res.status(200).json(talker);
});

module.exports = router;
