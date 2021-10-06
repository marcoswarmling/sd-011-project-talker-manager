// lógica adaptada de https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
const validEmail = (email) => {
    if (email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/igm)) return true;
    return false;
};

const validPassword = (pass) => {
  const minCharacter = 6;
  if (pass.length >= minCharacter) return true;
  return false;
};

const validLogin = (email, pass) => {
  if (validPassword(pass) && validEmail(email)) return true;
  return false;
};

// lógica adaptada de https://www.ti-enxame.com/pt/javascript/gere-stringcaracteres-aleatorios-em-javascript/967048592/
const generatorToken = (email, pass) => {
  if (validLogin(email, pass)) {
    let token = '';
    const possible = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    for (let index = 0; index < 16; index += 1) {
      token += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return token;
  } return false;
};

module.exports = { validEmail,
validPassword,
   validLogin,
generatorToken,
};
