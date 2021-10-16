const fs = require('fs');

const readTalkers = () => {
  let result = [];
  try {
    const data = fs.readFileSync('talker.json', 'utf8');
    result = JSON.parse(data);
  } catch (err) {
    console.error(`Erro ao ler o arquivo: ${err.path}`);
    console.log(err);
  }
  return result;
};

const getAllTalkers = (_req, res) => res.status(200).json(readTalkers());

const getTalkerById = (req, res) => {
  const { id } = req.params;
  console.log(typeof id);
  const filterTalker = readTalkers().find((talker) => talker.id === parseInt(id, 10));
  return (!filterTalker) ? (
    res.status(404).json({ message: 'Pessoa palestrante não encontrada' })
  ) : (
    res.status(200).json(filterTalker)
  );
};

module.exports = {
  getAllTalkers,
  getTalkerById,
};
