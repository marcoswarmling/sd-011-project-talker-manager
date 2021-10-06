const express = require('express');
const fs = require('fs');

const router = express.Router();

app.get('/talker', rescue(async (_request, response) => {
  const file = await fs.readFile('./talker.json', 'utf8');
  if (!file) return response.status(200).json([]);
  response.status(200).json(JSON.parse(file));
}));


router.get('/:id', (req, res) => {
  const talkers = fs.readFileSync('./talker.json', 'utf-8');
  const IdResponse = req.params.id;
  const parseTalkers = JSON.parse(talkers);
 const filteredTalkers = parseTalkers.find(({ id }) => id === Number(IdResponse));

 if (!filteredTalkers) {
 return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
}
  return res.status(200).json(filteredTalkers);
});

module.exports = router;