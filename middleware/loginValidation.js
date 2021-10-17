const HTTP_BAD_REQUEST_STATUS = 400;

function verifyEmail(request, response, next) {
  const { email } = request.body;

  const emailRegex = /\S+@\S+\.\S+/;

  if (!email || email === '') {
    return response
      .status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'O campo "email" é obrigatório' });
  }

  if (!emailRegex.test(email)) {
    return response
      .status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  next();
}

function verifyPassword(request, response, next) {
  const { password } = request.body;
  const minNumber = 6;

  if (!password || password === '') {
    return response
      .status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'O campo "password" é obrigatório' });
  }

  if (!password.length >= minNumber) {
    return response
      .status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
}

module.exports = {
  verifyEmail,
  verifyPassword,
};

// Referências: 
// https://medium.com/@norbertofariasmedeiros/five-steps-como-gerar-um-random-token-em-javascript-1e1488a15d28
