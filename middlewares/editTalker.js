const fs = require('fs').promises;

const readFile = async () => {
  const getDataFromFile = await fs.readFile('./talker.json', 'utf8');
  return getDataFromFile;
};

const editTalker = async (req, res, _next) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;

  const data = JSON.parse(await readFile());
  const findIndex = data.findIndex((i) => i.id === Number(id));
  data[findIndex] = { ...data[findIndex], name, age, talk };
  
  await fs.writeFile('./talker.json', JSON.stringify(data));

  const findOne = data.find((i) => i.id === Number(id));

  res.status(200).json(findOne);
};

module.exports = editTalker;
