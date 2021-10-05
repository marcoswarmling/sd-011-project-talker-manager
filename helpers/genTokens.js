function genRandomToken(size) {
  let token = '';
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < size; i += 1) {
    token += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }

  return token;
}

module.exports = { genRandomToken };
