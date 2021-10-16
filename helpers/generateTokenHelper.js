/** -------------------------------------------- *
 * Create a random token in JavaScript.
 * Source: https://stackoverflow.com/a/48031564 
 * --------------------------------------------- */

const generateToken = (tokenLength) => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let token = '';

  for (let i = 0; i < tokenLength; i += 1) {
    token += chars[Math.floor(Math.random() * chars.length)];
  }

  return token;
};

module.exports = generateToken;
