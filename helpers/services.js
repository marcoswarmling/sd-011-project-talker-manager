// https://www.codegrepper.com/code-examples/javascript/random+letter+in+javascript+generator
const generateToken = (size) => {
  const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let index = 0; index < size; index += 1) {
    token += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
  }
  return token;
};

module.exports = { generateToken };
