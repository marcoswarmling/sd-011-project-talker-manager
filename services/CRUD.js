const fs = require('fs').promises;

const getFileData = async () => {
  try {
    const data = await fs.readFile('./talker.json', 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    return err.message;
  }
};

const setFileData = async (newData) => {
  try {
    const data = await getFileData();
    const objNewData = { id: data.length + 1, ...newData };

    data.push(objNewData);
    await fs.writeFile('./talker.json', JSON.stringify(data));
    
    return objNewData;
  } catch (err) {
    return err.message;
  }
};

const editFileData = async (id, newData) => {
  try {
    const data = await getFileData();
    const objNewData = { ...data[id - 1], ...newData };
    data[id - 1] = objNewData;
    await fs.writeFile('./talker.json', JSON.stringify(data));
    
    return objNewData;
  } catch (err) {
    return err.message;
  }
};

const deleteFileData = async (id) => {
  try {
    const data = await getFileData();
    data.splice(id - 1, 1);
    
    await fs.writeFile('./talker.json', JSON.stringify(data));
  } catch (err) {
    return err.message;
  }
};

module.exports = {
  getFileData,
  setFileData,
  editFileData,
  deleteFileData,
};
