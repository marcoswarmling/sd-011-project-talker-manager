const express = require('express');
const bodyParser = require('body-parser');

const PORT = '3000';
const HTTP_OK_STATUS = 200;

const getRouter = require('./routes/getRouter');

const app = express();

app.use(bodyParser.json());

app.use('/talker', getRouter);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
