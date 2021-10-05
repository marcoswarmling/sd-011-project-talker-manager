const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
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

// fs.readFile('./talker.json', (err, content) => {
//   if(err) {
//     console.log(`Erro ao ler o arquivo: ${err.message}`);
//     return;
//   }
//   let contentFile = content.toString('utf8');
//   talkers = JSON.parse(contentFile);
// });

function getTalkers() {
  try {
    const data = fs.readFileSync('./talker.json', 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.log(`Erro ao ler o arquivo: ${err}`);
  }
}

app.get('/talker', function (req, res) {
  let talkers = getTalkers();
  res.status(200).json(talkers);
});

app.get('/talker/:id', function (req, res) {
  let talkers = getTalkers();
  const { id } = req.params;
  const talker = talkers.find((t) => t.id === parseInt(id));
  if(!talker) return res.status(404).json({ "message": "Pessoa palestrante não encontrada" });
  res.status(200).json(talker);
});