const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// const loginRouter = require('./router/loginRouter');
const talkerRouter = require('./router/talkerRouter');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// app.use('/login', loginRouter);
app.use('/talker', talkerRouter);

app.listen(PORT, () => {
  console.log('Online');
});
