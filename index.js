const express = require('express'); // utilizo o require de express pq ele me ajuda a lidar com rotas
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const app = express(); // dou o nome de app para o express(), para que fique mais facil de fazer o get, post, put e delete só chamando app Ex. app.get(), que é igual à express().get() 
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar.
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', async (_req, res) => {
  const getTalkers = await fs.readFile('./talker.json', 'utf-8');
  const getTalkersTransf = JSON.parse(getTalkers);
  return res.status(200).json(getTalkersTransf);
});

app.get('/talker/:id', async (req, res) => {
    const getTalkers = await fs.readFile('./talker.json', 'utf-8');
    const getTalkersTransf = JSON.parse(getTalkers);
    const { id } = req.params;
    const talkerId = getTalkersTransf.find((talker) => talker.id === Number(id));
    console.log(talkerId);
    if (!talkerId) return res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
    return res.status(200).json(talkerId);
});
