const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./routes/router');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.use('/talker', router);

// não remova esse endpoint, e para o avaliador funcionar

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});