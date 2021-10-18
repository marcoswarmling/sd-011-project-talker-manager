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

// referente ao req 3
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

module.exports = {
  readContent, 
  tokenGenerator, 
  checkEmail,
  checkPassword,
};