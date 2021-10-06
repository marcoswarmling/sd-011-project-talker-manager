const express = require('express');
const bodyParser = require('body-parser');

const talkerRoute = require('./routes/talkerRoute');
const talkerId = require('./routes/talkerId');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.use('/talker', talkerRoute);
app.use('/talker', talkerId);

app.listen(PORT, () => {
  console.log('Online');
});
