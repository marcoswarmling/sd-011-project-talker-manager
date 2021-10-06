const fs = require('fs').promises;

async function setPerson(data, { name, age, id, talk }) {
  try {
    await fs.writeFile('talker.json', JSON.stringify([...data, { name, age, id, talk }]));
  } catch (err) {
    throw new Error({ status: 400, message: err });
  }
}

module.exports = setPerson;
