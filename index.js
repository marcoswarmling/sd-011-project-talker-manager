const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const { makeid, validateEmail, validatePassword } = require('./checkInFunctions');

async function readTalker() {
  const talker = await fs.readFile('./talker.json');
  return JSON.parse(talker);
}

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.get('/talker', async (_req, res) => {
  const talker = await readTalker();
  res.status(HTTP_OK_STATUS).json(talker);
});

app.get('/talker/:id', async (req, res) => {
  const talker = await readTalker();
  const { id } = req.params;
  const resultado = await talker.find((obj) => obj.id === Number(id));
  if (resultado === undefined) {
    return res.status(404).send({ 
      message: 'Pessoa palestrante não encontrada', 
    }); 
  }
  res.status(HTTP_OK_STATUS).send(resultado);
});
app.post('/login', validateEmail, validatePassword, (req, res) => {
  // const { email, password } = req.body;
  console.log(req.body);
  const token = makeid();
  res.status(HTTP_OK_STATUS).json({ token });
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
