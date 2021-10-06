const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const {
  emailValidator,
  passwordValidator,
  tokenCreator,
} = require('./middlewares/loginMiddleware');

const {
  verifyToken,
  verifyName,
  verifyAge,
  verifyTalk,
  verifyTalkInfos,
} = require('./middlewares/talkersMiddleware');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';
const talkersFile = './talker.json';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

//  ----7 - Crie o endpoint GET /talker/search?q=searchTerm------------
app.get('/talker/search', verifyToken, (req, res) => {
  const { q } = req.query;
  try {
    const allTalkers = JSON.parse(fs.readFileSync(talkersFile, 'utf-8'));
    const filteredTalkers = allTalkers.filter((talker) =>
      talker.name.toLowerCase().includes(q.toLowerCase()));
    
    return res.status(200).json(filteredTalkers);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

//  -------------------------------------------------------------------
//  -----------2 - Crie o endpoint GET /talker/:id----------------------
app.get('/talker/:id', (req, res) => {
  const { id } = req.params;
  try { 
    const allTalkers = JSON.parse(fs.readFileSync(talkersFile, 'utf-8'));
    const talkerById = allTalkers.find((talker) => talker.id === +id);
    if (!talkerById) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    return res.status(HTTP_OK_STATUS).json(talkerById);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

//  -------------------------------------------------------------------
//  1 - Crie o endpoint GET /talker -----------------------------------
app.get('/talker', (_req, res) => {
  try { 
    const allTalkers = JSON.parse(fs.readFileSync(talkersFile, 'utf-8'));
    return res.status(HTTP_OK_STATUS).json(allTalkers);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
});

//  -------------------------------------------------------------------
//  -----------3 - Crie o endpoint POST /login-------------------------
app.post('/login', emailValidator, passwordValidator, tokenCreator, (req, res) => {
  const { token } = req;
  res.status(HTTP_OK_STATUS).json({ token: `${token}` });
});

//  -------------------------------------------------------------------
//  -----------4 - Crie o endpoint POST /talker-------------------------
app.post('/talker', verifyToken, verifyName, verifyAge, verifyTalk, verifyTalkInfos, (req, res) => {
  try {
    const allTalkers = JSON.parse(fs.readFileSync(talkersFile, 'utf-8'));
    const { name, age, talk } = req.body;
    const newTalker = { name, age, talk: { ...talk }, id: allTalkers.length + 1 };

    allTalkers.push(newTalker);

    fs.writeFileSync(talkersFile, JSON.stringify(allTalkers));
    return res.status(201).json(newTalker);
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    });
  }
});

//  -------------------------------------------------------------------
//  -----------5 - Crie o endpoint PUT /talker/:id-------------------------
app.put(
  '/talker/:id',
  [verifyToken, verifyName, verifyAge, verifyTalk, verifyTalkInfos],
  (req, res) => {
    const { id } = req.params;
    const { name, age, talk } = req.body;

    try {
      const allTalkers = JSON.parse(fs.readFileSync(talkersFile, 'utf-8'));
      const talkerIndex = allTalkers.findIndex((talker) => talker.id === +id);

      if (talkerIndex === -1) return res.status(404).json({ message: 'Talker not found!' });

      allTalkers[talkerIndex] = { ...allTalkers[talkerIndex], name, age, talk };
      fs.writeFileSync(talkersFile, JSON.stringify(allTalkers));

      return res.status(200).json(allTalkers[talkerIndex]);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
);

//  -------------------------------------------------------------------
//  -----------6 - Crie o endpoint DELETE /talker/:id------------------
app.delete('/talker/:id', verifyToken, (req, res) => {
  const { id } = req.params;

  try {
    const allTalkers = JSON.parse(fs.readFileSync(talkersFile, 'utf-8'));
    const talkerIndex = allTalkers.findIndex((talker) => talker.id === +id);

    if (talkerIndex === -1) return res.status(404).json({ message: 'Talker not found!' });

    allTalkers.splice(talkerIndex, 1);
    fs.writeFileSync(talkersFile, JSON.stringify(allTalkers));

    return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

app.all('*', (req, res) => {
  res.status(404).json({ message: `Route "${req.path}" doesn't exist` });
});

//  -------------------------------------------------------------------
// ----------------- Fim da aplicação -----------------
app.listen(PORT, () => {
  console.log('Online');
});
