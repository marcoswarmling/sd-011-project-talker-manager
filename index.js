const express = require('express');
const bodyParser = require('body-parser');

const { getAllTalkers } = require('./services/talkers');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  try {
    const data = await getAllTalkers();
    return res.status(200).send(JSON.parse(data));
  } catch (err) {
    console.log(err);
    return res.status(404).send({ message: 'Deu ruim' });
  }
  });

app.listen(PORT, () => {
  console.log('Online');
});
