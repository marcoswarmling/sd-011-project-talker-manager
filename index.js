const express = require('express');
const bodyParser = require('body-parser');
const talker = require('./routes/getAllTalkers');
const talkerID = require('./routes/getTalkerById');
const login = require('./routes/login');
const talkerPOST = require('./routes/createTalker');

const app = express();
app.use(bodyParser.json());
app.use(talker);
app.use(talkerID);
app.use(login);
app.use(talkerPOST);

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
