const express = require('express');
const fs = require('fs').promises;
const { 
  validateName, 
  validateAge, 
  validateTalk, 
  validateToken,
  validateWatchedAt,
  validateRate, 
} = require('./validacoes');

const router = express.Router();

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

router.post('/', 
  validateToken,
  validateTalk, 
  validateWatchedAt, 
  validateRate, 
  validateName, 
  validateAge, 
  async (req, res) => {  
  try {  
  const { name, age, talk } = req.body;  
  let talkers = await fs.readFile('./talker.json', 'utf-8');
  talkers = JSON.parse(talkers);
  const newTalker = { id: (talkers.length + 1), name, age, talk };
  talkers.push(newTalker);
  fs.writeFile('./talker.json', JSON.stringify(talkers));
  return res.status(201).send(newTalker);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
