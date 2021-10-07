const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (req, res) => {
  try {
    const fileContent = await fs.readFile('./talker.json', 'utf8');
    const palestrantes = JSON.parse(fileContent);
    return res.status(200).json(palestrantes);
  } catch (error) {
    return res.status(500).json({ message: 'Erro na leitura do arquivo!' });
  }
});

app.listen(PORT, () => {
  console.log('Online');
});
