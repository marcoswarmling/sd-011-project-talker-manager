const express = require('express');
const bodyParser = require('body-parser');
const talkerRoutes = require('./routes/talkerRoutes');
const { errorMiddlewares } = require('./middlewares/error');
const loginRoutes = require('./routes/loginRoutes');

const app = express();

app.use(bodyParser.json());
/* app.use(express.json()); */

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.use('/talker', talkerRoutes);

app.use('/login', loginRoutes.router);

app.get('/', (_request, response) => {
// não remova esse endpoint, e para o avaliador funcionar
  response.status(HTTP_OK_STATUS).send();
});

app.use(errorMiddlewares);

app.listen(PORT, () => {
  console.log('Online');
});
