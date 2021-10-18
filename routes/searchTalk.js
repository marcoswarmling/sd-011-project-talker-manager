const fs = require('fs').promises;

const readFile = () => fs.readFile('./talker.json', 'utf8').then((data) => JSON.parse(data));

const search = async (req, res) => {
  const { q } = req.query;
  const db = await readFile();
  if (!q || q === '') {
    return res.status(200).json(db);
  }
  const filtered = await db.filter((t) => t.name.includes(q));
  return res.status(200).json(filtered);
};

module.exports = { search };