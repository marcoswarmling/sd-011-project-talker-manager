const generateToken = require('../helpers/generateTokenHelper');

const getToken = () => {
  const token = generateToken(16);
  return token;
};

module.exports = getToken;