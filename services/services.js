const fs = require('fs').promises;
const validator = require('validator');

const readContent = async (file) => {
  try {
    const content = await fs.readFile(file, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    return null;
  }
};

// referente validacao do req 3
const tokenGenerator = () => {
    // https://thewebdev.info/2021/10/13/how-to-create-a-random-token-in-javascript/
  
    const rand = () => Math.random().toString(36).substr(2, 8);
    const token = `${rand()}${rand()}`;
  
    return token;
  };

  const checkEmail = (req, res, next) => {
    const { email } = req.body;
    if (!email || validator.isEmpty(email)) {
      return res
        .status(400)
        .json({ message: 'O campo "email" é obrigatório' }); 
    }
    if (!(validator.isEmail(email))) {
      return res
        .status(400)
        .json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }
    next();
  };
  
  const checkPassword = (req, res, next) => {
    const { password } = req.body;
    if (!password || validator.isEmpty(password)) {
      return res
        .status(400)
        .json({ message: 'O campo "password" é obrigatório' }); 
    }
    if (!(validator.isLength(password, { min: 6, max: undefined }))) {
      return res
        .status(400)
        .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    }
    next();
  };

  // referente validacao do req 4
const checkToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res
      .status(401)
      .json({ message: 'Token não encontrado' });
  }
  if (!(validator.isLength(token, { min: 16, max: 16 }))) {
    return res
      .status(401)
      .json({ message: 'Token inválido' });
  }
  next();
};

const checkName = (req, res, next) => {
  const { name } = req.body;
  if (!name || validator.isEmpty(name)) {
    return res
      .status(400)
      .json({ message: 'O campo "name" é obrigatório' });
  }
  if (!(validator.isLength(name, { min: 3, max: undefined }))) {
    return res
      .status(400)
      .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const checkAge = (req, res, next) => {
  const { age } = req.body;
  if (!age) {
    return res
    .status(400)
    .json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    return res
      .status(400)
      .json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
};

const checkTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk || !((talk.rate || talk.rate === 0) && talk.watchedAt)) {
    return res
      .status(400)
      .json({ 
        message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
      });
  }
  next();
};

const checkDate = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;
  if (!(validator.isDate(watchedAt, { format: 'DD/MM/YYYY' }))) {
    return res
      .status(400)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

const checkRate = (req, res, next) => {
  const { talk: { rate } } = req.body;
  const rateNumber = Number(rate);

  if (!(rateNumber >= 1 && rateNumber <= 5 && rateNumber % 1 === 0)) {
    return res
      .status(400)
      .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

const writeContent = async (file, content) => {
    try {
      const db = await readContent(file) || [];
      const id = db.length + 1;
      const newEntry = { id, ...content };
      db.push(newEntry);
      await fs.writeFile(file, JSON.stringify(db));
      return newEntry;
    } catch (error) {
      return null;
    }
  };

  // referente validacao do req 5
  const updateContent = async (file, content, id) => {
    const db = await readContent(file);
    const newEntry = { id: Number(id), ...content };
    const newdb = db.map((talker) => (talker.id === newEntry.id ? newEntry : talker));
    await fs.writeFile(file, JSON.stringify(newdb));
    return newEntry;
  };
  
module.exports = {
  readContent, 
  tokenGenerator, 
  checkEmail,
  checkPassword,
  checkToken,
  checkName,
  checkAge,
  checkTalk,
  checkDate,
  checkRate,
  writeContent,
  updateContent,
};