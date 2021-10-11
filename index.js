const express = require('express');
const bodyParser = require('body-parser');

const talkerRouter = require('./routers/talkerRouter');
const loginRouter = require('./routers/loginRouter');
const addTalkerRouter = require('./routers/addTalkerRouter');

const app = express();
app.use(bodyParser.json());

app.use('/', talkerRouter);
app.use('/', loginRouter);
app.use('/', addTalkerRouter);

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
