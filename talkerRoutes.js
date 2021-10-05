const router = require('express').Router();
const rescue = require('express-rescue');
const fs = require('fs').promises;

router.get('/', rescue(async (req, res) => {
    const fileContent = await fs.readFile('./talker.json');
    const talker = JSON.parse(fileContent);
    return res.status(200).json(talker);
}));

router.get('/:id', rescue(async (req, res) => {
  const { id } = req.params;
    const fileContent = await fs.readFile('./talker.json');
    const talker = await JSON.parse(fileContent);
    const talkerId = await talker.findIndex((t) => t.id === Number(id));
    if (Number(id) > talker.length) throw new Error('404');
    return res.status(200).json(talker[talkerId]);
}));

router.use((err, _req, res, _next) => {
  res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  // if (error === '404') return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

module.exports = router;