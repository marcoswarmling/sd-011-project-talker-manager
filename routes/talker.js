const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const app = express();
app.use(bodyParser.json());

module.exports = app.get('/talker', async (req, res) => {
  const readFileResult = await fs.readFile('./talker.json', 'utf-8').catch(() => {
    res.status(200).json([]);
  });
  const parseJson = JSON.parse(readFileResult);
  res.status(200).json(parseJson);
});
