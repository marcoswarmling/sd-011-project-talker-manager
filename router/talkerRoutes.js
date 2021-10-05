const router = require('express').Router();
const readAllTalkers = require('../helpers/fileHelpers');

const PATH_FILE = './talker.json';

router.get('/', async (_req, res) => {
  const result = await readAllTalkers(PATH_FILE) || [];

  res.status(200).json(result);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const readResult = await readAllTalkers(PATH_FILE);
  const resultado = readResult.find((item) => item.id === parseInt(id, 10));  
  
  if (!resultado) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  res.status(200).json(resultado);
});

module.exports = router;
