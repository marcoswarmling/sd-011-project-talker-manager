const fs = require('fs');
const getTalkers = require('../helper/talker');

const talkers = getTalkers();

const findIdToDelete = (talkerIdToDelete) => {
  const talkerToDelete = talkers.findIndex(
    ({ id }) => id === talkerIdToDelete,
  );
  if (talkerToDelete === -1) {
    return null;
  }
  const deletedElement = talkers.splice(talkerToDelete, 1)[0];
  return deletedElement;
};

const deleteTalker = (req, res) => {
  const { id } = req.params;
  const deletedTalker = findIdToDelete(Number(id));
  fs.writeFileSync('talker.json', JSON.stringify(deletedTalker));
  return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
};

module.exports = deleteTalker;
