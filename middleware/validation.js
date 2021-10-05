const fs = require('fs');

const path = './talker.json';

const getTalker = async (req, res) => {
  try {
    const talker = await fs.readFileSync(path, 'utf8');
    if (!talker) {
      return res.status(200).json([]);
    }
    res.status(200).json(JSON.parse(talker));
  } catch (error) {
    res.status(404).json(error);
  }
};

const getTalkerId = async (req, res) => {
  try {
    const talker = await fs.readFileSync(path, 'utf8');
    if (!talker) {
      return res.status(200).json([]);
    }
    const arrTalker = JSON.parse(talker);
    const findTalker = arrTalker.find(({ id }) => id === Number(req.params.id));
    if (!findTalker) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    res.status(200).json(findTalker);
  } catch (error) {
    res.status(404).json(error);
  }
};

function validEmail(email) {
  if (!email) {
    return 'O campo "email" é obrigatório';
  }
  if (!email.includes('@') || !email.includes('.com')) {
    return 'O "email" deve ter o formato "email@email.com"';
  }
  return false;
}

function validPassword(password) {
  if (!password) {
    return 'O campo "password" é obrigatório';
  }
  if (password.length < 6) {
    return 'O "password" deve ter pelo menos 6 caracteres';
  }
  return false;
}

const postLogin = async (req, res) => {
  const { email, password } = req.body;
  const emailValid = validEmail(email);
  const passwordValid = validPassword(password);
  if (emailValid) {
    return res.status(400).json({ message: emailValid });
  }
  if (passwordValid) {
    return res.status(400).json({ message: passwordValid });
  }
  res.status(200).json({ token: '7mqaVRXJSp886CGr' });
};

// req 4 --------
const validToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (token.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  next();
};

const validName = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const validAge = (req, res, next) => {
  const { age } = req.body;
  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (Number(age) < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

function verifyRate(rate) {
  return rate < 1 || rate > 5;
}

function verifyTalkItems(talk) {
  return !talk || (talk.rate !== 0 && !talk.rate) || !talk.watchedAt;
}

function validTalk(req, res, next) {
  const { talk } = req.body;

  if (verifyTalkItems(talk)) {
    return res.status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }

  if (!/\d{2}\/\d{2}\/\d{4}$/.test(talk.watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  if (verifyRate(talk.rate)) {
    return res.status(400).json({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }

  next();
}

const postTalker = async (req, res) => {
    const { name, age, talk } = req.body;
    const talker = JSON.parse(fs.readFileSync(path, 'utf8'));
    const id = talker.reduce((acc, val) => Math.max(acc, val.id), 0) + 1;
    const newTalk = {
      id,
      name,
      age,
      talk,
    };
    res.status(201).json(newTalk);
    fs.writeFileSync(path, JSON.stringify([...talker, newTalk]));
};

const putTalker = async (req, res) => {
  const { name, age, talk } = req.body;
  const { id } = req.params;
  const talker = JSON.parse(fs.readFileSync(path, 'utf8'));
  const newTalk = {
    id: Number(id),
    name,
    age,
    talk,
  };
  const filterTalkers = [...talker.filter((val) => val.id !== Number(id)), newTalk];
  res.status(200).json(newTalk);
  fs.writeFileSync(path, JSON.stringify(filterTalkers));
};

const deleteTalker = async (req, res) => {
  const { id } = req.params;
  const talker = JSON.parse(fs.readFileSync(path, 'utf8'));
  const filterTalkers = talker.filter((val) => val.id !== Number(id));
  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
  fs.writeFileSync(path, JSON.stringify(filterTalkers));
};

const searchTalker = async (req, res) => {
  const { q } = req.query;
  const talker = JSON.parse(fs.readFileSync(path, 'utf8'));
  
  if (!q) {
    return res.status(200).json(talker);
  }
  
  const filterTalkers = talker.filter((val) => val.name.includes(q));

  res.status(200).json(filterTalkers);
};

module.exports = {
  getTalker,
  getTalkerId,
  postLogin,
  validToken,
  validName,
  validAge,
  validTalk,
  postTalker,
  putTalker,
  deleteTalker,
  searchTalker,
};
