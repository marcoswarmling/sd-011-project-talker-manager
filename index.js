const app = require('express')();
const bodyParser = require('body-parser');
const fs = require('fs');
// const ultils = require('./Ultils');

app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.get('/talker', (_req, res) => {
  const talkers = fs.readFileSync('./talker.json', 'utf8')
  .then((contentFile) => JSON.parse(contentFile));
  res.status(HTTP_OK_STATUS).json(talkers);
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log(`Online on port: ${PORT} `);
});
