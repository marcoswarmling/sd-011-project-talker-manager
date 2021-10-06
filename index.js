const express = require('express');
const bodyParser = require('body-parser');
const { talkerDataMiddleware, authMiddleware, getToken } = require('./talkerData');

const app = express();
app.use(bodyParser.json());
app.use(talkerDataMiddleware);

const TALKER = 'talker.json';

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});


//req1
app.get('/talker', (req, res) => {
  const data = req.data;

  if (data.length === 0) return res.status(HTTP_OK_STATUS).json([]);

  res.status(HTTP_OK_STATUS).json(data);
});

//req2
app.get('/talker/:id', (req, res) => {
  const { id } = req.params;
  const data = req.data;
  const talker = data.find((d) => d.id === parseInt(id));

  if (!talker) res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  res.status(200).json(talker);
});

//req3
app.post('/login', authMiddleware, (req, res) => {
  res.status(200).json({
    token: getToken(),
  });
});

app.listen(PORT, () => {
  console.log('Online');
});
