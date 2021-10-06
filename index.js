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
    const talker = await fs.readFile('./talker.json');
    res.status(200).json(JSON.parse(talker));
  } catch (error) {
    res.status(200).json([]);
  }
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const talker = await fs.readFile('./talker.json', 'utf8');
    const teste = JSON.parse(talker).find((t) => t.id === parseInt(id, 10));
    if (!teste) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    res.status(200).json(teste);
  } catch (error) {
    res.status(404).json({ message: 'Algo deu errado, tente novamente.' });
  }
});

app.listen(PORT, () => {
  console.log('Online');
});
