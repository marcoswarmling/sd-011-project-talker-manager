const bodyParser = require('body-parser');
const express = require('express');
const services = require('./services');
const talkerRouter = require('./talkerRouter');
const loginRouter = require('./loginRouter');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.use('/', (req, _res, next) => {
  const talkers = services.readFileTalker();
  if (talkers) {
    req.talkers = talkers;
  }
  next();
});

app.use('/talker', talkerRouter);
app.use('/login', loginRouter);

app.listen(PORT, () => {
  console.log('Online');
});
