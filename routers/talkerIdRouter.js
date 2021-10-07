const { Router } = require('express');
const fs = require('fs');

const router = Router();

router.get('/:id', (req, res) => {
  const content = fs.readFileSync('./talker.json');
  const { id } = req.params;
  const talkers = JSON.parse(content);
  
  const talker = talkers.find((t) => t.id === parseInt(id, 10));

  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  return res.status(200).json(talker);
});

module.exports = router;