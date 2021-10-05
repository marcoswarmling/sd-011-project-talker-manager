const express = require('express');
const fs = require('fs').promises;

const router = express.Router();

function readTalker() {
  const fileData = fs.readFile('./talker.json', 'utf8')
    .then((data) => JSON.parse(data))
    .catch((err) => {
      console.log(`Erro na leitura, erro: ${err}`);
      process.exit(1);
    });
  return fileData;
}

router.get('/:id', async (req, res) => {
  const talkers = await readTalker();

  const { id } = req.params;
  const talker = talkers.find((t) => t.id === Number(id));

  if (!talker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  res.status(200).send(talker);
});

router.get('/', async (_req, res) => {
  const talkers = await readTalker();

  return res.status(200).json(talkers);
});

module.exports = router;