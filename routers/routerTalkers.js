const router = require('express').Router();

const { getTalkers } = require('../helpers/readFile');

router.get('/', async (_request, response) => {
  const talkers = await getTalkers('talker.json');
  if (!talkers) response.status(200).json([]);

  response.status(200).json(talkers);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const talkers = await getTalkers('talker.json');
  if (!talkers) res.status(200).json([]);
  const findTalker = talkers.find((target) => target.id === parseInt(id, 10));
  if (!findTalker) res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  res.status(200).json(findTalker);
});

module.exports = router;
