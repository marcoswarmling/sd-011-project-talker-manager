const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const talkersRouter = require('./routers/talkersRouter');
const userRouter = require('./routers/userRouter');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// Requisito 01:
app.use('/talker', talkersRouter);

// Requisito 02:
app.use('/talker/:id', talkersRouter);

// Requisito 03:
app.use('/login', userRouter);

app.listen(PORT, () => {
  console.log('Online');
});
