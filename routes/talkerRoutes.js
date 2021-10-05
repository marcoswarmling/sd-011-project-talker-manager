const router = require('express').Router();
const fs = require('fs').promises;

const { readTalkerFile } = require('../helpers/validations');
const { validateToken } = require('../helpers/validateToken');

router.get('/', async (_req, res) => {
  readTalkerFile()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch(({ message }) => res.status(500).json({ message }));
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  readTalkerFile()
  .then((data) => {
    const talker = data.find((t) => Number(t.id) === Number(id));
    if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    res.status(200).json(talker);
  })
  .catch(({ message }) => res.status(500).json({ message }));
});

const validateTalker = require('../helpers/validateTalker');

router.use(validateToken);
router.use(validateTalker);

router.post('/', (req, res) => {
  const { name, age, talk } = req.body;
  const talker = { name, age, talk };
  readTalkerFile()
  .then(async (data) => {
    const talkerData = {
      ...talker,
      id: data.length + 1,
    };
    await fs.writeFile('./talker.json', JSON.stringify([...data, talkerData], null, 2));
    res.status(201).json(talkerData);
  })
  .catch(({ message }) => res.status(500).json({ message }));
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  let talker = { name, age, talk };
  readTalkerFile()
    .then(async (data) => {
      const newData = data.map((t) => {
        if (Number(t.id) === Number(id)) {
          talker = { ...talker, id: t.id };
          return talker;
        }
        return t;
      });
      await fs.writeFile('./talker.json', JSON.stringify(newData, null, 2));
      res.status(200).json(talker);
    })
    .catch(({ message }) => res.status(500).json({ message }));
});

module.exports = router;
