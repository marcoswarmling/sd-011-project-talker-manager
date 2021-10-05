const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const allRouters = require('./router/allRouters');

const app = express();
app.use(bodyParser.json());
app.use('/', allRouters);

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const resposta = await fs.readFile('./talker.json', 'utf8');
    const talker = JSON.parse(resposta);
    const resultado = talker.find((item) => item.id === Number(id));
    if (!resultado) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    res.status(HTTP_OK_STATUS).json(resultado);
  } catch (error) {
    res.status(400).json(error);
  }
});

app.get('/talker', async (req, res) => {
  try {
    const resposta = await fs.readFile('./talker.json', 'utf8');
    if (!resposta) return res.status(HTTP_OK_STATUS).json([]);
    res.status(HTTP_OK_STATUS).json(JSON.parse(resposta));
  } catch (error) {
    res.status(400).json(error);
  }
});
