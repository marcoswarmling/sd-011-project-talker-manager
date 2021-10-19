const router = require('express').Router();
const fs = require('fs').promises;

const talkers = './talker.json';

const {
    validateName,
    validateAge,
    validateTalkBody,
    validateTalkKeys,
     } = require('../middlewares/talker.js');

       const validateToken = async (req, res, next) => {
        const { authorization } = req.headers;
        if (!authorization) {
          return res.status(401).json({ message: 'Token não encontrado' });
        }
        if (authorization.length < 16 || authorization.length > 16) {
          return res.status(401).json({ message: 'Token inválido' });
        }
        next();
      };

router.get('/', async (_req, res) => {
    const json = await fs.readFile(talkers);
    const results = JSON.parse(json);
      res.status(200).json(results);
});

router.get('/search', validateToken, async (req, res) => {
  const { q } = req.query;
  const data = await fs.readFile(talkers);
  const results = JSON.parse(data);
  if (q === '' || !q) {
    return res.status(200).json(results);
  }
  const TalkerswithFilter = results.filter((t) => t.name.toUpperCase().includes(q.toUpperCase()));
  res.status(200).json(TalkerswithFilter);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const data = await fs.readFile(talkers);
    const results = JSON.parse(data);
    const Matchid = results.find((result) => result.id === Number(id));
    if (!Matchid) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
     res.status(200).json(Matchid);
});

router
.post('/', validateToken, validateName, validateAge, validateTalkBody, validateTalkKeys,
async (req, res) => {
        const { name, age, talk } = req.body;
        const data = await fs.readFile(talkers);
        const results = JSON.parse(data);
        const newTalker = { name, age, talk: { ...talk }, id: results.length + 1 };
        results.push(newTalker);
         fs.writeFile(talkers, JSON.stringify(results));
          res.status(201).json(newTalker);
});

router.put('/:id', validateToken, 
validateName, validateAge, validateTalkBody, validateTalkKeys, async (req, res) => {
    const { id } = req.params;
    const { name, age, talk } = req.body;
    const data = await fs.readFile(talkers, 'utf-8');
    const results = JSON.parse(data);
    const matchTalker = results.map((talker) => talker.id === +id);
    const newTalker = { name, age, talk: { ...talk }, id: +id };
    matchTalker.push(newTalker);
   await fs.writeFile(talkers, JSON.stringify(matchTalker));
     res.status(200).json(newTalker);
});

router.delete('/:id', validateToken, async (req, res) => {
    const { id } = req.params;
    const data = await fs.readFile(talkers);
    const results = JSON.parse(data);
    const findtalker = results.filter((talker) => talker.id !== Number(id));
   await fs.writeFile(talkers, JSON.stringify(findtalker));
    res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
  });

module.exports = router;
