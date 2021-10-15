const fs = require('fs').promises;

const deleteTalker = async (req, res, _next) => {
  const idTalker = Number(req.params.id);
  const talkers = await JSON.parse(fs.readFile('talker.json'));
  const findTalker = talkers.filter((talker) => talker.id !== idTalker);

  await fs.writeFile('talker.json', JSON.stringify(findTalker));

  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
};

module.exports = deleteTalker;