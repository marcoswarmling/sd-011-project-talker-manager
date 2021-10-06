const express = require('express');

const app = express();
app.use(express.json());
const talkerRoutes = require('./routes/talker');
const loginRoute = require('./routes/login');

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.use('/talker', talkerRoutes);
app.use('/login', loginRoute);

app.listen(PORT, () => {
  console.log('Online');
});
