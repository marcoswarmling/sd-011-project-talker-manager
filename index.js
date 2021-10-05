const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
const { getTalkers, setTalker } = require('./readTalker');
const { IDVerification } = require('./authTalkers');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

// Requisito 1

app.get('/talker', (_req, res) => {
  const talkers = getTalkers();
  res.status(200).send(talkers);
});

// Requisito 2

router.get('/talker/:id', IDVerification, (req, res) => {
  const { id } = req.params;
  const talkers = getTalkers();
  const filteredTalker = talkers.find((talker) => Number(talker.id) === Number(id));
  res.status(200).send(filteredTalker);
});

module.exports = router;