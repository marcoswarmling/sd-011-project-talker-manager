const fs = require('fs').promises;

const file = 'talker.json';

const getAll = async () => {
  const result = await fs.readFile(file, 'utf8');
  return result;
};

const getById = async (id) => {
  const result = await fs.readFile(file, 'utf8');
  const parsedResult = JSON.parse(result);
  const talker = parsedResult.find((item) => item.id === parseInt(id, 10));

  // if (!talker) return null;
  
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

const edit = async (talkerObj, id) => {
  const db = JSON.parse(await getAll());
  const formatTalker = talkerObj;

  formatTalker.id = parseInt(id, 0);

  const newDb = db.map((talker) => (talker.id !== formatTalker.id ? talker : formatTalker));

  fs.writeFile(file, JSON.stringify(newDb, undefined, 2), (err) => {
    if (err) return console.log(err);
  });

  return formatTalker;
};

const deleteTalker = async (id) => {
  const db = JSON.parse(await getAll());

  const newDb = db.filter((talker) => (talker.id !== parseInt(id, 0)));

  fs.writeFile(file, JSON.stringify(newDb, undefined, 2), (err) => {
    if (err) return console.log(err);
  });

  return { message: 'Pessoa palestrante deletada com sucesso' };
};

const searchTalker = async (query) => {
  const db = JSON.parse(await getAll());
  return db.filter((value) => value.name.includes(query));
};

module.exports = { getAll, getById, create, edit, deleteTalker, searchTalker };
