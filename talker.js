const express = require('express');
const fs = require('fs').promises;

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

module.exports = router;
