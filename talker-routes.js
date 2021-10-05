const express = require('express');

const router = express.Router();
const fs = require('fs');

const app = express();

app.use(express.json());

router.get('/talker', async (req, res) => {
  const talkers = await fs.readFile('./talker.json', 'utf-8');
  
  if (!talkers) {
    res.status(200).json([]);
  }

  try {
    res.status(200).json(talkers);
  } catch (err) {
    console.log(err);
  }
});

router.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await fs.readFile('./talker.json', 'utf-8');

  if (!id) {
    res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  try {
    const singleTalker = talkers.find((t) => t.id === Number(id));
    res.status(200).json(singleTalker);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
