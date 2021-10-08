// Site explicando como exportar varias funcoes: https://qastack.com.br/programming/16631064/declare-multiple-module-exports-in-node-js

function makeid() {
  // funcao retirada e adaptada de: https://www.ti-enxame.com/pt/javascript/gere-stringcaracteres-aleatorios-em-javascript/967048592/
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < 16; i += 1) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}

function validateEmail(req, res, next) {
  // Funcao do Cesar Bhering
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  if (!email.includes('@') || !email.includes('.com')) { // verifica se o email contem "@" ou ".com"
 return res
      .status(400)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' }); 
}
  next();
}

function validatePassword(req, res, next) {
  const { password } = req.body;
  console.log(password, typeof (password));
  if (password === undefined || password === '') {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' }); 
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' }); 
  }
  next();
}
module.exports = { 
  makeid,
  validateEmail,
  validatePassword,
};
