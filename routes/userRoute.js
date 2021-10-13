const express = require('express');
const fs = require('fs').promises;
const {
  checkToken,
  validateName,
  validateAge,
  validateTalk,
  validateRate,
  validateDateFormat,
  validateRateDate,
} = require('../middleware/userValidation');

const userRoute = express.Router();
const TALKER_FILE_PATH = './talker.json';

// Requisito 7
userRoute.get('/search', checkToken,
async (req, res) => {
  const { q } = req.query;
  const fileContent = JSON.parse(await fs.readFile(TALKER_FILE_PATH, 'utf8'));
  const talkerIndex = fileContent.filter((t) => t.name.includes(q));
  return res.status(200).json(talkerIndex);
});

// requisito 1
userRoute.get('/', async (_req, res) => {
  try {
    const fileContent = JSON.parse(await fs.readFile(TALKER_FILE_PATH, 'utf8'));
    return res.status(200).json(fileContent);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

// requisito 2
userRoute.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const fileContent = JSON.parse(await fs.readFile('./talker.json', 'utf8'));
    const data = fileContent.find((t) => t.id === Number(id));
    if (!data) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

// Requisito 4
userRoute.post('/',
checkToken,
validateName,
validateAge,
validateTalk,
validateRate,
validateDateFormat,
validateRateDate,
async (req, res) => {
  const { name, age, talk } = req.body;
  const fileContent = JSON.parse(await fs.readFile(TALKER_FILE_PATH, 'utf8'));
  // const addId = fileContent[fileContent.length - 1].id + 1;
  const addId = fileContent.length + 1;
  const newTalker = { id: addId, name, age, talk };
  
  fileContent.push(newTalker);
  await fs.writeFile('./talker.json', JSON.stringify(fileContent));
  return res.status(201).json(newTalker);
});

// Requisito 5
userRoute.put('/:id',
checkToken,
validateName,
validateAge,
validateTalk,
validateRate,
validateDateFormat,
validateRateDate,
async (req, res) => {
  const { name, age, talk } = req.body;
  const { id } = req.params;
  const fileContent = JSON.parse(await fs.readFile(TALKER_FILE_PATH, 'utf8'));
  const temporaryTalkers = fileContent.filter((t) => t.id !== Number(req.params.id));

  const updatedTalker = { name, age, talk, id: Number(id) };
  const updateList = [...temporaryTalkers, updatedTalker];
  await fs.writeFile('./talker.json', JSON.stringify(updateList));
  return res.status(200).json(updatedTalker);
});

// Requisito 6
userRoute.delete('/:id', checkToken,
async (req, res) => {
  const { id } = req.params;
  const fileContent = JSON.parse(await fs.readFile(TALKER_FILE_PATH, 'utf8'));
  const talkerIndex = fileContent.filter((t) => t.id !== Number(id));
  fileContent.push(talkerIndex);
  await fs.writeFile(TALKER_FILE_PATH, JSON.stringify(talkerIndex));

  return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

// userRoute.get('/search', )

module.exports = userRoute;