const router = require('express').Router();
const { readFile } = require('../utils/fsutils');

const jsonTalker = 'talker.json';

router.get('/talker', async (_req, res) => {
  const result = JSON.parse(await readFile(jsonTalker));
  if (result.length < 1) return res.status(200).json([]);
  res.status(200).json(result);
});

router.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const result = JSON.parse(await readFile(jsonTalker));

  const talkerById = result.find((e) => Number(e.id) === Number(id));
  
  if (!talkerById) {
    return res
      .status(404)
      .json({ message: 'Pessoa palestrante não encontrada' });
  }

  res.status(200).json(talkerById);
});

module.exports = router;