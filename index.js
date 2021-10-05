const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const rescue = require('express-rescue');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const validateFile = rescue((req, _res, next) => {
  const result = fs.readFileSync('./talker.json');
  req.fileContent = JSON.parse(result);
  next();
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', validateFile, (req, res) => {
  const { fileContent } = req;
  if (!fileContent.length) return res.status(HTTP_OK_STATUS).json([]);
  res.status(HTTP_OK_STATUS).json(fileContent);
});

app.get('/talker/:id', validateFile, (req, res) => {
  const { id } = req.params;
  const { fileContent } = req;
  const foundTalker = fileContent.find((t) => t.id === parseInt(id, 10));
  if (!foundTalker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(HTTP_OK_STATUS).json(foundTalker);
});

app.use((err, _req, res, _next) => { 
  res.status(500).json({ error: `Erro: ${err.message}` });
});

app.listen(PORT, () => {
  console.log('Online');
});
