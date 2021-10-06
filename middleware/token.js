const HTTP_OK_STATUS = 200;

const token = (req, res) => {
  const value = () => Math.random(0).toString(36).substr(2);

  const tk = (value() + value() + value() + value()).substr(0, 16);
  
  return res.status(HTTP_OK_STATUS).json({ tk });
};

module.exports = token;
