const express = require('express');
const bodyParser = require('body-parser');
const talkerRouter = require('./routes/talkerRouter');

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

app.use('/talker', talkerRouter);

app.post('/login', validNameAndEmail, (req, res) => {
  const token = generateToken();
  res.status(200).send({ token });
});

app.listen(PORT, () => {
  console.log('Online');
});
