const express = require('express');
const { getFile, writeFile } = require('../helpers/fs-utils');
const {
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
} = require('../middlewares');

const router = express.Router();

router.get('/', async (req, res) => {
  const response = await getFile('./talker.json');

  if (response.length < 1) return res.status(200).json([]);

  res.status(200).json(response);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const response = await getFile('./talker.json');

  const talker = response.find((t) => t.id === Number(id));

  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  res.status(200).json(talker);
});

router.post('/',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  async (req, res) => {
    const { name, age, talk } = req.body;
    const data = await getFile('./talker.json');

    const newTalker = { name, age, id: data.length + 1, talk };

    data.push(newTalker);

    await writeFile('./talker.json', data);

    res.status(201).json(newTalker);
  });

module.exports = router;
