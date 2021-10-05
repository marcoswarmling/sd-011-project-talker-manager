const express = require('express');
const app = express();
const HTTP_OK_STATUS = 200;
const PORT = '3000';
const talkerRouter = require('./talkerRouter');

app.use(express.json());
// não remova esse endpoint, e para o avaliador funcionar
app.use('/', talkerRouter, (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
