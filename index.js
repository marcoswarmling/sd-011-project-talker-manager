const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const talkerJSON = './talker.json';

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// Requisito 2:
/*app.get('/talker/:id', (req, _res) => {
  const { id } = req.params;
  talkers.find((talker) => talker.id === id);
});
*/
// Requisito 1:
app.get('/talker', async (_req, res) => {
  const talkers = await fs.readFile(talkerJSON, 'utf-8', (error, data) => {
    if (error) {
      console.log('Error!');
    }
    return data;
  });

  res.status(200).json(talkers);
});

app.listen(PORT, () => {
  console.log('Online');
});
