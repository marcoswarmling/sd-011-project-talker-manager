const express = require('express');
const fs = require('fs').promises;

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await fs.readFile('./talker.json', 'utf8');
  console.log('esse é o talker', talker);
  const findId = JSON.parse(talker).find((element) => element.id === Number(id));
  console.log('esse é o findId', findId);
  if(!findId) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada'
  });
}
  return res.status(200).json(findId);
})

app.get('/talker', async (_req, res) => {
  const data = await fs.readFile('./talker.json', 'utf8');
  const talker = JSON.parse(data);

  return res.status(200).json(talker);
});

app.listen(PORT, () => {
  console.log('Online');
});
