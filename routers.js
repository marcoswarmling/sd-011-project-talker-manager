const router = require('express').Router();
const fs = require('fs').promises;
const { 
  validEmail,
  validPassword,
  validAge,
  validName,
  validTalk,
  validToken,
  validWatchAt,
  validTalkRate } = require('./validations');

const talker = 'talker.json';

router.get('/talker/search', validToken, async (req, res) => {
  const response = JSON.parse(await fs.readFile(talker, 'utf8'));
  const { q } = req.query;
  const filteredTalkers = response.filter((r) => r.name.includes(q));
  res.status(200).json(filteredTalkers); 
});

router.get('/talker', async (_req, res) => {
  const response = JSON.parse(await fs.readFile(talker, 'utf8'));
  if (response.length < 1) return res.status(200).json([]);
  res.status(200).json(response);
});

router.get('/talker/:id', async (req, res) => {
  const response = JSON.parse(await fs.readFile(talker, 'utf8'));
  const findTalker = response.find(({ id }) => Number(id) === Number(req.params.id));
  if (!findTalker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(200).json(findTalker);
});

router.post('/login', validEmail, validPassword,
  (_req, res) => res.status(200).json({ token: '7mqaVRXJSp886CGr' }));

router.post('/talker', validToken, validName, validAge, validTalk, validWatchAt, validTalkRate,
  async (req, res) => {
    const response = JSON.parse(await fs.readFile(talker, 'utf8'));
    const { name, age, talk } = req.body;
    const newTalker = {
      id: response.length + 1,
      name,
      age,
      talk,
    };
    response.push(newTalker);
    res.status(201).json(newTalker);
    fs.writeFile(talker, JSON.stringify(response));
});

router.put('/talker/:id', validToken, validName, validAge, validTalk, validWatchAt, validTalkRate,
  async (req, res) => {
    const response = JSON.parse(await fs.readFile(talker, 'utf8'));
    const { name, age, talk } = req.body;
    const mapTalker = response.map((element) => 
    (Number(element.id) === Number(req.params.id) ? { id: element.id, name, age, talk } : element));

    const findTalker = mapTalker.find(({ id }) => Number(id) === Number(req.params.id));
    res.status(200).json(findTalker);
    fs.writeFile(talker, JSON.stringify(mapTalker));
});

router.delete('/talker/:id', validToken,
  async (req, res) => {
    const response = JSON.parse(await fs.readFile(talker, 'utf8'));

    const findTalker = response.findIndex(({ id }) => Number(id) === Number(req.params.id));

    response.splice(findTalker, 1);
    fs.writeFile(talker, JSON.stringify(response));
    res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

module.exports = router;
