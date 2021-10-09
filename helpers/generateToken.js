// https://stackoverflow.com/questions/8532406/create-a-random-token-in-javascript-based-on-user-details
function generateToken() {
  const TOKEN_LENGTH = 16;
  const ALPHA_NUMERICS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
  const alphaArray = ALPHA_NUMERICS.split('');
  
  const tokenArray = [];  
  for (let i = 0; i < TOKEN_LENGTH; i += 1) {
    const j = (Math.random() * (alphaArray.length - 1)).toFixed(0);
    tokenArray[i] = alphaArray[j];
  }
  return tokenArray.join('');
}
module.exports = {
  generateToken,
};
