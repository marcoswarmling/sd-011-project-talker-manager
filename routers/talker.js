const router = require('express').Router();

const { getFileData } = require('../services/CRUD');

router.get('/', async (_req, res) => {
  const result = await getFileData();

  res.status(200).json(result);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const result = await getFileData();
  const personById = result.find((person) => person.id === parseInt(id, 10));
  
  if (!personById) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  res.status(200).json(personById);
});

// router.post('/', async (_req, res) => {
//   const result = await getFileData();

//   res.status(200).json(result);
// });

module.exports = router;