const express = require('express');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');
const utils = require('./fs-utils');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', rescue(async (req, res) => {
  try {
    const talkers = await utils.getTalkers();

    if (!talkers) {
      return res.status(200).json([]);
    }
  
    res.status(200).json(talkers);
  } catch (e) {
    res.status(400).json(e);
  }
}));

app.listen(PORT, () => {
  console.log('Online');
});
