const app = require('express')();
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const { validateEmail,
  validatePassword,
  validateToken,
  validateName,
  validateAge,
  validateDate,
  validateRate,
  validateTalk,
} = require('./midwares/validates');

app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

async function readTalker() {
  const talker = await fs.readFile('./talker.json');
  return JSON.parse(talker);
}

app.get('/talker', async (_req, res) => {
  const talker = await readTalker();
  res.status(HTTP_OK_STATUS).json(talker);
});

app.get('/talker/:id', async (req, res) => {
  const talker = await readTalker();
  const { id } = req.params;
  const resultado = await talker.find((obj) => obj.id === Number(id));
  if (resultado === undefined) {
    return res.status(404).send({ 
      message: 'Pessoa palestrante não encontrada',
    }); 
  }
  res.status(HTTP_OK_STATUS).send(resultado);
});

app.post('/login', validateEmail, validatePassword, (_req, res) => {
 res.status(200).json({ token: '7mqaVRXJSp886CGr' });
});

app.post('/talker',
validateToken,
validateName,
validateAge,
validateDate,
validateRate,
validateTalk, async (req, res) => {
  const { name, age, talk } = req.body;
  const { watchedAt, rate } = talk;
  const talkerDB = await JSON.parse(fs.readFile('./talker.json', 'utf8'));
  const id = talkerDB.length + 1;
  const newTalker = {
    id,
    name,
    age,
    talk: {
      watchedAt,
      rate,
    },
  };

  talkerDB.push(newTalker);

  await fs.writeFile('./talker.json', JSON.stringify(talkerDB));
  res.status(201).json(newTalker);
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log(`Online on port: ${PORT} `);
});
