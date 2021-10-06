const fs = require('fs').promises;

const readFile = async () => {
  const getDataFromFile = await fs.readFile('./talker.json', 'utf8');
  return getDataFromFile;
};

const deleteTalker = async (req, res, _next) => {
  const { id } = req.params;

  const data = JSON.parse(await readFile());
  const filteredData = data.filter((i) => i.id !== Number(id));

  await fs.writeFile('./talker.json', JSON.stringify(filteredData));

  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
};

module.exports = deleteTalker;
