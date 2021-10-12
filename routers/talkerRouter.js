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

const talkerPath = './talker.json';

const router = express.Router();

router.get('/', async (req, res) => {
  const response = await getFile(talkerPath);

  if (response.length < 1) return res.status(200).json([]);

  res.status(200).json(response);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const response = await getFile(talkerPath);

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
    const data = await getFile(talkerPath);

    data.push({ name, age, id: data.length + 1, talk });

    await writeFile('./talker.json', data);

    res.status(201).json({ name, age, id: data.length, talk });
});

router.put('/:id',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  async (req, res) => {
    const { id } = req.params;
    const { name, age, talk } = req.body;
    const data = await getFile(talkerPath);

    const talkerData = data.map((t) => (t.id === Number(id)
      ? { name, age, id: Number(id), talk } : t));

    await writeFile(talkerPath, talkerData);

    const talker = talkerData.find((t) => t.id === Number(id));
    
    res.status(200).json(talker);
});

router.delete('/:id', validateToken, async (req, res) => {
  const { id } = req.params;
  const data = await getFile(talkerPath);
  const talkerIndex = data.findIndex((t) => t.id === Number(id));

  data.splice(talkerIndex, 1);

  await writeFile(talkerPath, data);

  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

module.exports = router;
