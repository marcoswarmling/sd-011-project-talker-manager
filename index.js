const express = require('express');
const bodyParser = require('body-parser');

const talker = require('./routes/talker');
const search = require('./routes/searchTalk');
const postTalker = require('./routes/postTalker');
const putTalker = require('./routes/putTalker');
const deleteTalker = require('./routes/deleteTalker');
const login = require('./validations/validationLogin');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.use('/talker/search',
  postTalker.tokenAuthentication,
  search.search);

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

app.put('/talker/:id',
postTalker.tokenAuthentication,
postTalker.nameOk,
postTalker.ageOk,
postTalker.talkOk,
postTalker.talkRateOk,
postTalker.talkWatchedAtOk,
putTalker.updateTalker);

app.delete('/talker/:id',
postTalker.tokenAuthentication,
deleteTalker.delTalker);

app.listen(PORT, () => {
  console.log(`Online na porta ${PORT}`);
});
