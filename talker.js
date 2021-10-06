const express = require('express');
const fs = require('fs').promises;
const m = require('./middleware/index');

const router = express.Router();

const PATH = 'talker.json';

const talkerData = async (file) => {
  const data = await fs.readFile(file, 'utf-8');
  return JSON.parse(data);
};

router.get('/', async (_request, response) => {
  try {
    const data = await fs.readFile(PATH, 'utf-8');
    return response.status(200).json(JSON.parse(data));
  } catch (error) {
    return response.status(200).json([]);
  }
});

router.get('/:id', async (request, response) => {
  const { id } = request.params;
  try {
    const data = await talkerData(PATH);
    const idTalker = data.find((talk) => talk.id === Number(id));

    if (!idTalker) {
      return response.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }

    return response.status(200).json(idTalker);
  } catch (error) {
    return response.status(500).end();
  }
});

router.post('/',
  m.tokenVerify, m.nameVerify, m.ageVerify, m.talkVerify, m.fieldVerify,
  async (req, res) => {
    const { name, age, talk } = req.body;
    try {
      const data = await talkerData(PATH);
      const newTalker = { name, age, talk, id: (data.length + 1) };

      await fs.writeFile(PATH, JSON.stringify([...data, newTalker]));
      res.status(201).json(newTalker);
    } catch (error) {
      res.status(500).end();
    }
  });

router.put('/:id',
  m.tokenVerify, m.nameVerify, m.ageVerify, m.talkVerify, m.fieldVerify,
  async (req, res) => {
    const { name, age, talk } = req.body;
    const { id } = req.params;

    try {
      const data = await talkerData(PATH);
      const newTalker = { name, age, talk, id: Number(id) };
      const idTalker = data.filter((t) => t.id !== Number(id));

      await fs.writeFile(PATH, JSON.stringify([...idTalker, newTalker]));
      res.status(200).json(newTalker);
    } catch (error) {
      res.status(500).end();
    }
  });

router.delete('/:id',
  m.tokenVerify,
  async (req, res) => {
    const { id } = req.params;

    try {
      const data = await talkerData(PATH);
      const idTalker = data.filter((t) => t.id !== Number(id));

      await fs.writeFile(PATH, JSON.stringify(idTalker), 'utf-8');
      res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
    } catch (error) {
      res.status(500).end();
    }
  });

router.get('/search',
  m.tokenVerify,
  async (req, res) => {
    const { q } = req.query;
    try {
      const data = await talkerData(PATH);

      if (!q || q === '') {
        return res.status(200).json(data);
      }
      const filterQuery = data
        .filter(({ id, name, age, talk: { watchedAt, rate } }) => name.includes(q)
          || watchedAt.includes(q)
          || rate === Number(q)
          || age === Number(q)
          || id === Number(q));

      res.status(200).json(filterQuery);
    } catch (error) {
      return res.status(400).end();
    }
  });

module.exports = router;
