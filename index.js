const express = require('express');
const bodyParser = require('body-parser');

const talkerRouter = require('./router/talkerRoutes');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.use('/talker', talkerRouter);

app.listen(PORT, () => {
  console.log('Online');
});
