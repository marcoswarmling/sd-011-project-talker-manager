const express = require('express');
// const bodyParser = require('body-parser');
const fs = require('fs');
const {
  emailValidation,
  tokenGenerate,
  passValidation,
  tokenRequest,
  nameValidation,
  ageValidation,
  talkValidation,
  talkDetailsValidation,
} = require('./validations/validations');

const app = express();
// app.use(bodyParser.json());
app.use(express.json());

const HTTP_OK_STATUS = 200;
const HTTP_ERROR_STATUS = 500;
const HTTP_NOTFOUND_STATUS = 404;
const PORT = '3000';
const talkers = 'talker.json';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

// d1
app.get('/talker', (_req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(talkers, 'utf-8'));
    return res.status(HTTP_OK_STATUS).json(data);
  } catch (err) {
    return res.status(HTTP_ERROR_STATUS).json({ message: err });
  }
});

// d2
app.get('/talker/:id', (req, res) => {
  const { id } = req.params;
  try {
    const data = JSON.parse(fs.readFileSync(talkers, 'utf-8'));
    const filterTalker = data.find((target) => target.id === Number(id));
    if (!filterTalker) {
      return res.status(HTTP_NOTFOUND_STATUS).json({
        message: 'Pessoa palestrante não encontrada',
      });
    }
    return res.status(HTTP_OK_STATUS).json(filterTalker);
  } catch (err) {
    return res.status(HTTP_ERROR_STATUS).json({ message: err });
  }
});

// d3
app.post('/login', emailValidation, passValidation, tokenGenerate, (req, res) => {
  const { token } = req;
  res.status(HTTP_OK_STATUS).json({ token: `${token}` });
});

// d4
app.post(
  '/talker',
  tokenRequest,
  nameValidation,
  ageValidation,
  talkValidation,
  talkDetailsValidation,
  (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(talkers, 'utf-8'));
    const { name, age, talk } = req.body;
    const newData = { name, age, talk: { ...talk }, id: data.length + 1 };

    data.push(newData);

    fs.writeFileSync(talkers, JSON.stringify(data));
    return res.status(201).json(newData);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
  },
);

// d5
app.put(
  '/talker/:id',
  tokenRequest,
  nameValidation,
  ageValidation,
  talkValidation,
  talkDetailsValidation,
  (req, res) => {
    const { id } = req.params;
    const { name, age, talk } = req.body;
    try {
      const data = JSON.parse(fs.readFileSync(talkers, 'utf-8'));
      const talker = data.findIndex((person) => person.id === Number(id));
      if (talker === -1) {
        return res.status(404).json({ message: 'Talker not found!' });
      }

      data[talker] = { ...data[talker], name, age, talk };
      
      fs.writeFileSync(talkers, JSON.stringify(data));
      return res.status(200).json(data[talker]);
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  },
);

// d6
app.delete('/talker/:id', tokenRequest, (req, res) => {
  const { id } = req.params;
  try {
    const data = JSON.parse(fs.readFileSync(talkers, 'utf-8'));
    const talker = data.findIndex((person) => person.id === Number(id));

    if (talker === -1) {
      return res.status(404).json({ message: 'Talker not found!' });
    }

    data.splice(talker, 1);
    fs.writeFileSync(talkers, JSON.stringify(data));
    
    return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// d7
app.get('/talker/search', tokenRequest, (req, res) => {
  const { q } = req.query;
  try {
    const data = JSON.parse(fs.readFileSync(talkers, 'utf-8'));
    const filtaker = data.filter((t) => t.name.toLowerCase().includes(q.toLowerCase()));

    return res.status(200).json(filtaker);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
