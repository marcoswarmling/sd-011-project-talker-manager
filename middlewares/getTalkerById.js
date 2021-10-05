const fs = require('fs').promises;

const readFile = async () => {
  const getDataFromFile = await fs.readFile('./talker.json', 'utf8');
  return getDataFromFile;
};

const getTalkerById = async (req, res, _next) => {
  const { id } = req.params;
  const data = JSON.parse(await readFile());
  const findTalker = data.find((t) => t.id === Number(id));
  if (!findTalker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  
  res.status(200).json(findTalker);
  console.log(findTalker);
};

module.exports = getTalkerById;