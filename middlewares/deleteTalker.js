const fs = require('fs');

const deleteTalker = async (req, res) => {
  const { id } = req.params;
  const talkers = await JSON.parse(fs.readFileSync('talker.json', 'utf-8'));
  const getTalkerIndex = talkers.findIndex((talkerId) => talkerId.id === Number(id));
  talkers.splice(getTalkerIndex, 1);
  await fs.writeFile('talker.json', JSON.stringify(talkers));
  return res.status(200).json({
    message: 'Pessoa palestrante deletada com sucesso',
  });
};

module.exports = deleteTalker;