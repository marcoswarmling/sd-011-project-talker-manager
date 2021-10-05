const router = require('express').Router();

const talkersJson = require('../helper/fs');

router.get('/', async (req, res) => {
  const data = await talkersJson();

  res.status(200).json(data);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const data = await talkersJson();

  const findTalker = data.find((talker) => Number(talker.id) === Number(id));

  if (!findTalker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  res.status(200).json(findTalker);
});

module.exports = router;