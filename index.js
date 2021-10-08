const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// 1 - Crie o endpoint GET /talker
const talkerRouter = require('./router/talkerRouter');

app.use('/talker', talkerRouter);

// 2 - Crie o endpoint GET /talker/:id
const getTalkerId = require('./router/getTalkerId');

app.use('/:id', getTalkerId);

// 3 - Crie o endpoint POST /login
const loginRouter = require('./router/loginRouter');

app.use('/login', loginRouter);

// 4 - Crie o endpoint POST /talker
const postTalker = require('./router/postTalker');

app.use('/talker', postTalker);

// 5 - Crie o endpoint PUT /talker/:id
const putTalker = require('./router/putTalkerId');

app.use('/:id', putTalker);

// 6 - Crie o endpoint DELETE /talker/:id
const deleteTalker = require('./router/deleteTalkerId');

app.use('/:id', deleteTalker);

app.listen(PORT, () => {
  console.log('Online');
});