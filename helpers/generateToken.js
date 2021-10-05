const rsg = require('@ack_inc/rand-str');

const generateToken = (len) => {
  const token = rsg(len, {
    lowercase: true,
    uppercase: true,
    digits: true,
    symbols: false,
  }); 
  return token;
};

module.exports = generateToken;