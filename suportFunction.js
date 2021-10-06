// peguei do link https://stackoverflow.com/questions/8532406/create-a-random-token-in-javascript-based-on-user-details

function generateToken(length) {
  // edit the token allowed characters
  const a = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'.split('');
  const b = [];  
  for (let i = 0; i < length; i += 1) {
      const j = (Math.random() * (a.length - 1)).toFixed(0);
      b[i] = a[j];
  }
  return b.join('');
}

module.exports = {
  generateToken,
};