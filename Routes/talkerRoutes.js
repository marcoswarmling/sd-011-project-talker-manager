const router = require('express').Router();
const fs = require('fs').promises;

const getTalkers = async () => {
try {
  const talkers = await fs.readFile('./talker.json', 'utf8');
  return JSON.parse(talkers);
} catch (error) {
  return null;
}
};

router.get('/talker', async (_req, res) => {
  const talkers = await getTalkers() || [];
  return res.status(200).json(JSON.parse(talkers));
});

router.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await getTalkers() || [];

  const dados = talkers.find((talker) => talker.id === parseInt(id, 10));

  if (!dados) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  res.status(200).json(dados);
});

/*  ||
app.post('/login', () => {});
app.post('/talker', () => {});
app.put('/talker/:id', () => {});
app.delete('/talker/:id', () => {});
app.get('/talker/search?q=searchTerm', () => {}); */

module.exports = router;