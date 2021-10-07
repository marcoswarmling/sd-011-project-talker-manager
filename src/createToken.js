const createToken = (size) => {
    const allChars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let token = '';
    while (token.length < size) {
      const randomIndex = Math.floor(Math.random() * allChars.length);
      token += allChars[randomIndex];
    }
    return token;
  }; 
  
  module.exports = createToken;