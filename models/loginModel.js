const generateToken = require('../helpers/generateTokenHelper');

const getToken = () => {
  const token = generateToken(16);
  console.log(token, token.length);
  return token;
};

module.exports = getToken;