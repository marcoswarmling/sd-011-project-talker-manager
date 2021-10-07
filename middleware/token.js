const HTTP_OK_STATUS = 200;

const token = (req, res) => {
  const value = () => Math.random(0).toString(36).substr(2);

  const tk = (value() + value()).substr(0, 16);
  console.log(tk);
  return res.status(HTTP_OK_STATUS).json({ token: tk });
};

module.exports = token;
