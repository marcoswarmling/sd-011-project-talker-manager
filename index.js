const express = require('express');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');
const fs = require('fs');
// const talkerRouter = require('./routers/getTalker');
// const loginRouter = require('./routers/login');
// const postTalker = require('./routers/PostTalker');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// app.use('/talker', talkerRouter);
// app.use('/login', loginRouter);
// app.use('/talker', postTalker);

const validateFile = rescue((req, _res, next) => {
  const result = fs.readFileSync('./talker.json');
  req.fileContent = JSON.parse(result);
  next();
});

app.get('/talker/:id', validateFile, (req, res) => {
  const { id } = req.params;
  const { fileContent } = req;
  const foundTalker = fileContent.find((t) => t.id === parseInt(id, 10));
  if (!foundTalker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(HTTP_OK_STATUS).json(foundTalker);
});

app.use((err, _req, res, _next) => { 
  res.status(500).json({ error: `Erro: ${err.message}` });
});

app.listen(PORT, () => {
  console.log('Online');
});