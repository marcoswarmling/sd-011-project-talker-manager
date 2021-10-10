// create Token
const createToken = (req, res, next) => {
  const aux = Math.random().toString(36).substr(2, 8);

  req.newToken = aux + aux;
  next();
};

module.exports = createToken;
