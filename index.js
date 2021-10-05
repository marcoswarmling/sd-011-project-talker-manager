const express = require('express');
const bodyParser = require('body-parser');

const { getAllTalkers, getTalkerById } = require('./services/talkers');
const { validNameAndEmail } = require('./middlewares/validLogin');

const { generateToken } = require('./helpers/generateToken');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
    const data = await getAllTalkers();
    if (!data) res.status(200).json([]);
    return res.status(200).send(data);
  });

  app.get('/talker/:id', async (req, res) => {
    const { id } = req.params;
      const data = await getTalkerById(id);
      if (!data) res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
      return res.status(200).send(data);
  });

  app.post('/login', validNameAndEmail, (req, res) => {
    const token = generateToken();
    res.status(200).send({ token });
  });

app.listen(PORT, () => {
  console.log('Online');
});
