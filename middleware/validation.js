const fs = require('fs').promises;

const getTalker = async (req, res) => {
  try {
    const talker = await fs.readFile('./talker.json', 'utf8');
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
    const talker = await fs.readFile('./talker.json', 'utf8');
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

function validToken(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (!token.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  next();
}

function validName(req, res, next) {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (!name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
}

function validAge(req, res, next) {
  const { age } = req.body;
  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (!age.length < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
}

function validTalk(req, res, next) {
  const { talk } = req.body;
  if (!talk || [!talk.rate, !talk.watchedAt].includes(true)) {
    return res.status(400).json({ message: 'rio e "watchedAt" e "rate" não podem ser vazios' });
  }

  if (!/\d{2}\/\d{2}\/\d{4}$/.test(talk.watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  if (!/^[1-5]$/.test(talk.rate)) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
}

const postTalker = async (req, res) => {
  const { name, age, talk } = req.body;
  const talker = await JSON.parse(fs.readFile('./talker.json', 'utf8'));
  const id = talker.reduce((acc, val) => Math.max(acc, val), 0);
  return res.status(201).json({
    id,
    name,
    age,
    talk,
  });
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
};
