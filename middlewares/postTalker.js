const fs = require('fs');

const postTalker = (req, res) => {
  const { name, age, talk } = req.body;
  const talker = JSON.parse(fs.readFileSync('talker.json', 'utf-8'));
  const newId = { id: talker.length + 1 };
  const newTalker = { newId, name, age, talk };
  talker.push(newTalker);
  fs.writeFileSync('talker.json', JSON.stringify(talker));
  return res.status(201).json(newTalker);
};
module.exports = postTalker;
