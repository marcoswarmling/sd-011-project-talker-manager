const express = require('express');
const fs = require('fs').promises;

const router = express.Router();

const PATH = 'talker.json';

router.get('/', async (_request, response) => {
  try {
    const data = await fs.readFile(PATH, 'utf-8');
    return response.status(200).json(JSON.parse(data));
  } catch (error) {
    return response.status(200).json([]);
  }
});

module.exports = router;
