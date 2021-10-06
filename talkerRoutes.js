const express = require('express');

const app = express();
app.use(express.json());

const router = express.Router();
const fs = require('fs').promises;

router.get('/', async (req, res) => {
  try {
  const talkers = await fs.readFile('./talker.json', 'utf-8');
  const parseTalkers = JSON.parse(talkers);
  if (!parseTalkers) {
    return res.status(200).send([]);
  }
    return res.status(200).json(parseTalkers);
  } catch (err) {
    console.log(err);
  } 
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const talkers = await fs.readFile('./talker.json', 'utf-8');
    const parseTalkers = JSON.parse(talkers);
    
    const singleTalker = parseTalkers.find((t) => t.id === Number(id));
    if (!singleTalker) {
      return res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
    }
    return res.status(200).json(singleTalker);
  } catch (err) {
    console.log(err);
  }
});

router.post('/');

module.exports = router;
