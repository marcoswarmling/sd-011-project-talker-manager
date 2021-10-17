const express = require('express');
const bodyParser = require('body-parser');

const talker = require('./routes/talker');
const postTalker = require('./routes/postTalker');
const login = require('./validations/validationLogin');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.use('/login',
  login.emailOk,
  login.passwordOk,
  login.generateToken);

app.use('/talker', talker);

app.post('/talker',
postTalker.tokenAuthentication,
postTalker.nameOk,
postTalker.ageOk,
postTalker.talkOk,
postTalker.talkRateOk,
postTalker.talkWatchedAtOk,
postTalker.newTalker);

app.listen(PORT, () => {
  console.log(`Online na porta ${PORT}`);
});
