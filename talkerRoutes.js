const router = require('express').Router();
const rescue = require('express-rescue');
const readFile = require('./utilityFunctions/readFile');
const validateRegister = require('./middleware/validateRegister');

router.get('/', rescue(async (req, res) => {
    const file = await readFile();
    return res.status(200).json(file);
}));

router.get('/:id', rescue(async (req, res) => {
  const { id } = req.params;
  const file = await readFile();
  const talkerId = await file.findIndex((t) => t.id === Number(id));

  if (Number(id) > file.length) throw new Error('404');

  return res.status(200).json(file[talkerId]);
}));

router.post('/', validateRegister, rescue(async (req, res) => {
  // const file = await readFile();
  res.status(201).json({ message: 'pessoa cadastrada com sucesso!' });
}));

router.use((err, _req, res, _next) => {
  res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

module.exports = router;
