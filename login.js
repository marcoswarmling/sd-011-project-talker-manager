function createToken() {
  const alphabet = 'abcdefghijklmnopqrstuvxywz1234567890'.split('');
  const token = [];
  for (let index = 0; index < 16; index += 1) {
    const positionArray = Math.floor(Math.random() * 36);
    token.push(alphabet[positionArray]);
  }

  return token.join('');
}

function passwordExists(password) {
  return password !== null && typeof password !== 'undefined';
}

function isPasswordlValid(password) {
  return password.length >= 6;
}

function passwordValidaded(password, res) {
  if (!passwordExists(password)) {
    res.status(400).json({ message: 'O campo "password" é obrigatório' });
    return;
  }
  if (!isPasswordlValid(password)) {
    res
      .status(400)
      .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    return;
  }
  return true;
}

function isEmailValid(email) {
  const rexexEmail = /[a-zA-Z0-9_]+@+[a-zA-Z0-9_]+.com/;
  return rexexEmail.test(email);
}

function emailExists(email) {
  return email !== null && typeof email !== 'undefined';
}

function emailValidaded(email, res) {
  if (!emailExists(email)) {
    res.status(400).json({ message: 'O campo "email" é obrigatório' });
    return;
  }
  if (!isEmailValid(email)) {
    res
      .status(400)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' });
    return;
  }
  return true;
}

async function doLogin(req, res) {
  const { email, password } = req.body;
  if (passwordValidaded(password, res) && emailValidaded(email, res)) {
    return res.status(200).json({ token: createToken() });
  }
}

module.exports = { doLogin };
