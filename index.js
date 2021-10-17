const express = require('express');
const { StatusCodes } = require('http-status-codes');
const bodyParser = require('body-parser');

const talker = require('./routes/talker');

const app = express();
app.use(bodyParser.json());

app.use('/talker', talker);

const PORT = '3000';

app.get('/', (_request, response) => {
  response.status(StatusCodes.OK).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
