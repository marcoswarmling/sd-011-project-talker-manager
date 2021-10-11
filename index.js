const express = require('express');
const bodyParser = require('body-parser');
const talkerRouter = require('./routers/talkerRouter');
const errorMiddleware = require('./middlewares/errorMiddleware');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.use('/talker', talkerRouter);

app.all('*', (req, res) => {
  res.status(404).json({ message: `Route "${req.path}" doesn't exist` });
});

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log('Online');
});
