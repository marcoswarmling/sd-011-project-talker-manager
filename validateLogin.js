// Link: https://www.webtutorial.com.br/funcao-para-gerar-uma-string-aleatoria-random-com-caracteres-especificos-em-javascript/
function generationToken(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let index = 0; index < length; index += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function validateEmail(req, res, next) {
  const { email } = req.body;
  const emailFormat = /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,15}$/;
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!emailFormat.test(email)) {
    return res.status(400).json({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }
  next();
}

const validatePassword = (req, res, next) => {
  const { password } = req.body;
  const passwordLimit = 6;
  if (!password) res.status(400).json({ message: 'O campo "password" é obrigatório' }); 
  if (password.length < passwordLimit) {
    return res.status(400).json({
      message: 'O "password" deve ter pelo menos 6 caracteres' }); 
    }
    next();
  };
  
  module.exports = { validateEmail,
    validatePassword,
    generationToken,
  };
