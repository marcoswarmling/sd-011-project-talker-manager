const tokenGenerator = () => {
  // https://thewebdev.info/2021/10/13/how-to-create-a-random-token-in-javascript/

  const rand = () => Math.random().toString(36).substr(2, 8);
  const token = `${rand()}${rand()}`;
  
  return token;
};

module.exports = {
  tokenGenerator,
};