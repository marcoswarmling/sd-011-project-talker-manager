const fs = require('fs');
const getTalker = require('../helper/talker');

const editTalker = (req, res) => {
  const talker = getTalker();
  const newTalker = req.body;
  const newId = Number(req.params.id);
  newTalker.id = newId;
  const updatedTalker = talker.map(({ id }) => {
    if (id === newId) {
      return { ...newTalker };
    }
    return talker;
  });
  fs.writeFileSync('talker.json', JSON.stringify(updatedTalker));
  return res.status(200).json(newTalker);
};

module.exports = editTalker;
