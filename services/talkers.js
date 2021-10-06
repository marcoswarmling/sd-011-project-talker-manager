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
  // [...talkers, newTalker]
  const updatedTalkers = [newTalker];
  console.log(updatedTalkers);
  await fs.writeFile(DATA_PATH, JSON.stringify(updatedTalkers));
  return newTalker;
};

module.exports = {
  getAllTalkers,
  getTalkerById,
  addTalker,
};