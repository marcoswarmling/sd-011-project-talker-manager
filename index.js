const express = require('express');
const bodyParser = require('body-parser');

const PORT = '3000';
const HTTP_OK_STATUS = 200;

const talkerRoutes = require('./router/talkerRoutes');
const loginRoutes = require('./router/loginRoutes');

const app = express();

app.use(bodyParser.json());

app.use('/talker', talkerRoutes);
app.use('/login', loginRoutes);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
