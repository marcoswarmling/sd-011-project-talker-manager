const express = require('express');
const bodyParser = require('body-parser');
const errorMiddleware = require('./utils/errorMiddleware');
const talkerRouter = require('./routers/talkerRouter');

// ATENÇÃO, MAN: Cara, vc trocou node por nodemon no package.json. desfaça depois.

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.use('/piu', talkerRouter); // meu testador de rota

app.use('/talker', talkerRouter);



app.all('*', function(req, res) {
  return res.status(404).send('Router not found');
});

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log('Online');
});
