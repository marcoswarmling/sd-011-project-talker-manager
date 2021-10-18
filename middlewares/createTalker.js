const fs = require('fs');

const talker = require('../helper/talker');

const createTalker = (req, res) => {
  const getTalker = talker();
  const talkerLength = getTalker.length;
  const speaker = req.body;
  getTalker.push(speaker);
  speaker.id = talkerLength + 1;
  fs.writeFileSync('talker.json', JSON.stringify(getTalker));
  res.status(201).json(speaker);
};

module.exports = createTalker;
