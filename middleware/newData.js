const fs = require('fs').promises;

const HTTP_OK_STATUS = 201;

const newData = async (req, res) => {
  const { name, age, talk } = req.body;
  const fetch = await fs.readFile('../talker.json', 'utf-8');
  const parseFetch = await JSON.parse(fetch);
  res.status(HTTP_OK_STATUS).json(parseFetch);
  const obj = {
    id: parseFetch.length + 1,
    name,
    age,
    talk,
  };
  parseFetch.push(obj);
  await fs.writeFile('../talker.json', JSON.stringify(parseFetch));

  return res.status(HTTP_OK_STATUS).json(obj);
};

module.exports = newData;
