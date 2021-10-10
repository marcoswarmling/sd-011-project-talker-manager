const HTTP_OK_STATUS = 200;

const tokenGeneration = (_req, res) => {
  const { status } = res;
  const randomlyGenerate = () => Math.random().toString(36).substr(2);
  const token = (randomlyGenerate() + randomlyGenerate()).substr(0, 16);

  return status(HTTP_OK_STATUS).json({ token });
};

module.exports = tokenGeneration;