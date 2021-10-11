const express = require('express');
const fs = require('fs').promises;

const talkersJSON = './talker.json';
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
  const talkers = await fs.readFile(talkersJSON, 'utf-8');
  const parseTalkers = JSON.parse(talkers);
  if (!parseTalkers) {
    return res.status(200).send([]);
  }
    return res.status(200).json(parseTalkers);
  } catch (err) {
    console.log(err);
  } 
});

router.get('/search', validateToken, async (req, res) => {
  try {
  const { q } = req.query;
  let talkers = await fs.readFile(talkersJSON, 'utf-8');
  talkers = JSON.parse(talkers);

  const queryFilteredTalkers = talkers.filter((t) => t.name.includes(q));
  if (queryFilteredTalkers.length === 0) return res.status(200).json([]); 
  
  if (!q || q === '') res.status(200).json(talkers);
  res.status(200).json(queryFilteredTalkers);
  } catch (err) {
    console.log(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const talkers = await fs.readFile(talkersJSON, 'utf-8');
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
  let talkers = await fs.readFile(talkersJSON, 'utf-8');
  talkers = JSON.parse(talkers);
  const newTalker = { id: (talkers.length + 1), name, age, talk };
  talkers.push(newTalker);
  fs.writeFile(talkersJSON, JSON.stringify(talkers));
  return res.status(201).send(newTalker);
  } catch (err) {
    console.log(err);
  }
});

router.put('/:id',
validateToken,
validateName, 
validateAge,
validateTalk, 
validateRate, 
validateWatchedAt, 
async (req, res) => {
  try {
  const { name, age, talk } = req.body;
  const { id } = req.params;
  let talkers = await fs.readFile(talkersJSON, 'utf-8');
  talkers = JSON.parse(talkers);    
  const update = [{ id: Number(id), name, age, talk }];
  console.log(update);
  // https://stackoverflow.com/questions/37585309/replacing-objects-in-array
  const updatedTalkers = talkers.map((obj) => update.find((el) => el.id === obj.id) || obj);
  await fs.writeFile(talkersJSON, JSON.stringify(updatedTalkers));
  res.status(200).json(update[0]);    
  } catch (err) {
    res.status(400).json({ message: 'deu um erro aqui' });
    console.log(err);
  }
});

router.delete('/:id', validateToken, async (req, res) => {
  const { id } = req.params;
  let talkers = await fs.readFile(talkersJSON, 'utf-8');
  talkers = JSON.parse(talkers);
  const talkersWithoutDeleted = talkers.filter((t) => Number(t.id) !== Number(id)); 
  console.log(talkersWithoutDeleted); 
  await fs.writeFile(talkersJSON, JSON.stringify(talkersWithoutDeleted));

  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

module.exports = router;
