const router = require('express').Router();
const fs = require('fs').promises;

router.get('/', async (_req, res) => {
  const data = await fs.readFile('./talker.json', 'utf8');
  const talker = JSON.parse(data);

  return res.status(200).json(talker);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await fs.readFile('./talker.json', 'utf8');
  const findId = JSON.parse(talker).find((element) => element.id === Number(id));
  if (!findId) {
    return res
      .status(404)
      .json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(findId);
});

module.exports = router;