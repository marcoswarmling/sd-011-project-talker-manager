const fs = require('fs').promises;

const getTalkersData = async () => {
  try {
    const data = await fs.readFile('./talker.json', 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    return err.message;
  }
};

const setTalkersData = async (data) => {
  try {
    const talkers = await getTalkersData();
    const newTalkersData = {
      id: talkers.length + 1, ...data,
    };

    talkers.push(newTalkersData);

    await fs.writeFile('./talker.json', JSON.stringify(talkers));
    return newTalkersData;
  } catch (err) {
    return err.message;
  }
};

const editTalkersData = async (id, newData) => {
  try {
    const talkers = await getTalkersData();

    const newTalkersData = {
      ...talkers[id - 1], ...newData,
    };

    talkers[id - 1] = newTalkersData;

    await fs.writeFile('./talker.json', JSON.stringify(talkers));

    return newTalkersData;
  } catch (err) {
    return err.message;
  }
};

module.exports = { getTalkersData, setTalkersData, editTalkersData };
