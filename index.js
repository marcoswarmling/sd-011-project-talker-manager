const express = require('express');
const bodyParser = require('body-parser');

const talkerRouter = require('./routers/talkerRouter'); // req. 1
const talkerIdRouter = require('./routers/talkerIdRouter'); // req. 2
const loginRouter = require('./routers/loginRouter'); // req. 3
const addTalker = require('./routers/addTalker'); // req. 4

const deleteTalker = require('./routers/deleteTalker'); // req. 6

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// req. 1
app.use('/talker', talkerRouter);

// req. 2
app.use('/talker', talkerIdRouter);

// req. 3
app.use('/login', loginRouter);

// req. 4
app.use('/talker', addTalker);

// req. 6
app.use('/talker', deleteTalker);

app.listen(PORT, () => {
  console.log('Online');
});
