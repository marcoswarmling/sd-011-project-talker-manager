const express = require('express');
const bodyParser = require('body-parser');

const talkerRouter = require('./routes/talkerRouter');
const TalkerIdRouter = require('./routes/talkerIdRouter');
const loginRouter = require('./routes/loginRouter');
const newTalkerRouter = require('./routes/newTalkerRouter');
const editTalker = require('./routes/talkerIdRouterPUT');
const deleteTalker = require('./routes/deleteTalker');
const talkerByQuery = require('./routes/talkerByQuery');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// Requisito 7
app.use('/talker', talkerByQuery); // É o primeiro para não atrapalhar a ordem das rotas.

// Requisito 01
app.use('/talker', talkerRouter);

// Requisito 02
app.use('/talker', TalkerIdRouter);

// Requisito 3
app.use('/login', loginRouter);

// Requisito 4
app.use('/talker', newTalkerRouter);

// Requisito 5
app.use('/talker', editTalker);

// Requisito 6
app.use('/talker', deleteTalker);

app.listen(PORT, () => {
  console.log('Online');
});
