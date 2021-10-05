const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
const rescue = require('express-rescue');

const functionsAsync = require('./functionAsync.js');
const { validateEmail, validatePassword, generatorToken } = require('./validate.js');

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', 
rescue(async (_req, res) => {
  const read = await functionsAsync.getReadFile();
  if (read === ' ') return res.status(200).json([]);
  }));

  app.get('/talker/:id', async (req, res) => {
    const { id } = req.params;
    const sync = await functionsAsync.getReadFile();
    const filter = sync.find((i) => i.id === id);
    if (!filter) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    return res.status(202).json(filter);
  });

  app.post('/login', validateEmail, validatePassword, (_req, res) => res.status(200).json({
    token: generatorToken(),
  }));

app.listen(PORT, () => {
  console.log('Online');
});
