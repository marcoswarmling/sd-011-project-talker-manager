const getLastId = require('./retrieveLastId');
const { writeFile } = require('./handleJson');

const update = async (req, res) => {
  const { name, age, talk } = req.body;
  const lastId = await getLastId();
  const obj = {
    id: lastId,
    name,
    age,
    talk,
  };
  writeFile(obj);
  res.status(201).json(obj);
};

module.exports = update;