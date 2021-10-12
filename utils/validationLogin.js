const err = (statusCode) => ({ statusCode });

const validationEmail = (email) => {
  if (!email) throw err({ status: 400, message: 'O campo "email" é obrigatório' });
  const emailRegex = /^[\w.]+@[a-z]+.\w{2,3}$/g.test(email);
  if (!emailRegex) {
    throw err({ status: 400, message: 'O "email" deve ter o formato "email@email.com"' });
  }
};

const validationPassword = (password) => {
  if (!password) throw err({ status: 400, message: 'O campo "password" é obrigatório' });
  if (password.length <= 5) {
    throw err({ status: 400, message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
};

module.exports = { validationEmail, validationPassword };
