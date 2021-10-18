const fs = require('fs').promises;

const file = 'talker.json';

const getAll = async () => {
  const result = await fs.readFile(file, 'utf8');
  return result;
};

const getById = async (id) => {
  const result = JSON.parse(await fs.readFile(file, 'utf8'));
  const talker = result.find((item) => item.id === parseInt(id, 10));

  if (!talker) return null;
  
  return talker;
};

const create = async (talkerObj) => {
  const db = JSON.parse(await fs.readFile(file, 'utf8'));

  const createTalkerId = db.length + 1;
  const fomatTalker = talkerObj;

  fomatTalker.id = createTalkerId;

  db.push(fomatTalker);

  fs.writeFile(file, JSON.stringify(db, undefined, 2), (err, result) => {
    if (err) return console.log(err);
    console.log(result);
  });

  return talkerObj;
};

module.exports = { getAll, getById, create };
