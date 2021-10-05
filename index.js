const express = require('express');
const bodyParser = require('body-parser');
const talkerRoutes = require('./routes/talker');
const loginRoutes = require('./routes/login');

const app = express();
app.use(bodyParser.json());
app.use('/login', loginRoutes);
app.use('/talker', talkerRoutes);

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
