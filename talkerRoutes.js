const router = require('express').Router();
const rescue = require('express-rescue');
const readTalkerFile = require('./readTalkerFile');
const writeTalkerFile = require('./writeTalkerFile');
const validateRegister = require('./middleware/validateRegister');
const validateToken = require('./middleware/validateToken');

router.get('/', rescue(async (req, res) => {
    const file = await readTalkerFile();
    return res.status(200).json(file);
}));

router.get('/:id', rescue(async (req, res) => {
  const { id } = req.params;
  const file = await readTalkerFile();
  const talkerId = await file.findIndex((t) => t.id === Number(id));

  if (talkerId === -1) throw new Error('404');

  return res.status(200).json(file[talkerId]);
}));

router.post('/', validateToken, validateRegister, async (req, res) => {
  try {
    const file = await readTalkerFile();
    const newTalker = { ...req.body, id: file.length + 1 };
    const addNewTalker = JSON.stringify([...file, newTalker]);
    await writeTalkerFile(addNewTalker);
    return res.status(201).json(newTalker);
  } catch (error) {
    console.error(error);
  }
});

router.put('/:id', validateToken, validateRegister, async (req, res) => {
  const { id } = req.params;
  try {
    const file = await readTalkerFile();
    const talkerIndex = file.findIndex((t) => t.id === Number(id));
    if (talkerIndex === -1) return res.status(404).json({ message: 'Talker not found' });
    file[talkerIndex] = { ...req.body, id: Number(id) };
    const updatedFile = JSON.stringify(file);
    await writeTalkerFile(updatedFile);
    return res.status(200).json({ ...req.body, id: Number(id) });
  } catch (error) {
    console.error(error);
  }
});

router.use((err, _req, res, _next) => {
  res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

module.exports = router;
