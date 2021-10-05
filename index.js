const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const talkerFile = './talker.json';

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// --------------------------------------------------------//
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});
// --------------------------------------------------------//

// test getAllTalkers.test.js
app.get('/talker', (_req, res) => {
  const talker = JSON.parse(fs.readFileSync(talkerFile, 'utf8'));
  
  if (talker.length > 0) {
    return res.status(200).json(talker);
  }
  
  if (talker.length === 0) {
    return res.status(200).json([]);
  }
});

// test getTalkerById.test.js
app.get('/talker/:id', (req, res) => {
  const { id } = req.params;
  const talker = JSON.parse(fs.readFileSync(talkerFile, 'utf8'));
  const talkerId = talker.find((t) => t.id === Number(id));
  
  if (!talkerId) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  if (talkerId) {
    return res.status(200).json(talkerId);
  }
});

app.listen(PORT, () => {
  console.log('Online');
});
