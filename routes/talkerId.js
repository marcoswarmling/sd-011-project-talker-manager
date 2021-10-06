const { Router } = require('express');
const fs = require('fs').promises;

const router = Router();

router.get('/:id', async (req, res) => {
  const dados = await fs.readFile('./talker.json');
  const { id } = req.params;
  const talkers = JSON.parse(dados);

  const talker = talkers.find((t) => t.id === parseInt(id, 10));

  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  return res.status(200).json(talker);
});

module.exports = router;