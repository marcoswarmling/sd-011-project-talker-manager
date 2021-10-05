const router = require('express').Router();
const { readTalker, writeTalker } = require('../helpers/fileHelpers');
const validateToken = require('../middlewares/validateToken');
const { 
  validateName,
  validateAge,
  validateTalk,
  validateTalkExists,
} = require('../middlewares/validateInsertData');

const PATH_FILE = './talker.json';

router.get('/', async (_req, res) => {
  const result = await readTalker(PATH_FILE) || [];

  res.status(200).json(result);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const readResult = await readTalker(PATH_FILE);
  const resultado = readResult.find((item) => item.id === parseInt(id, 10));  
  
  if (!resultado) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  res.status(200).json(resultado);
});

router.post(
  '/',
  validateToken,
  validateName,
  validateAge,
  validateTalkExists,
  validateTalk,
  async (req, res) => {
    const result = req.body;
    const readJson = await readTalker(PATH_FILE);
    result.id = readJson[readJson.length - 1].id + 1;
    readJson.push(result);
    await writeTalker(PATH_FILE, readJson);
    res.status(201).json(result);
  },
);

module.exports = router;
