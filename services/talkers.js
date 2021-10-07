const path = require('path');
const fs = require('fs').promises;

const DATA_PATH = path.join(__dirname, '../', 'talker.json');

const getTalkers = async () => {
  const data = await fs.readFile(DATA_PATH, 'utf8');
  const talkers = JSON.parse(data);
  return talkers;
};

const getAllTalkers = async () => {
    const talkers = await getTalkers();
    return talkers;
  };

  const getTalkerById = async (id) => {
    const talkers = await getTalkers();
    const foundedTalker = talkers.find((t) => t.id === Number(id));
    return foundedTalker;
  };

const addTalker = async (body) => {
    const { name, age, talk } = body;
    const talkers = await getTalkers();
    const NEXT_ID = talkers.length + 1;
    
    const newTalker = {
      name,
      age,
      id: NEXT_ID,
      talk,
    };
    // [...talkers, newTalker];
    const updatedTalkers = [...talkers, newTalker];
    await fs.writeFile(DATA_PATH, JSON.stringify(updatedTalkers));
    return newTalker;
};

const alterTalkers = async (id, body) => {
  const { name, age, talk } = body;
  const talkers = await getTalkers();
  const talker = talkers.find((t) => t.id === Number(id));

  const uptadedTalkerInfo = {
    name,
    age,
    id: talker.id,
    talk,
  };

  talkers[`${talker.id}`] = uptadedTalkerInfo; 
  await fs.writeFile(DATA_PATH, JSON.stringify(talkers));
  return uptadedTalkerInfo;
};

const deleteTalker = async (id) => {
  const talkers = await getTalkers();
  const talker = talkers.find((t) => t.id === Number(id));
  const index = talker.id - 1;
  talkers.splice(index, 1);
  await fs.writeFile(DATA_PATH, JSON.stringify(talkers));
  return true;
};

const searchTalker = async (term) => {
  const talkers = await getTalkers();
  if (!term) return talkers;
  const talker = talkers.filter((t) => t.name.includes(term));
  if (!talker) return {};
  return talker;
};

module.exports = {
  getAllTalkers,
  getTalkerById,
  addTalker,
  alterTalkers,
  deleteTalker,
  searchTalker,
};