const fs = require('fs').promises;
const {
  validationToken,
  validationTalk,
  validationName,
  validationAge } = require('../../utils/validatePerson');

const attPerson = async (req, res, next) => {
  const token = req.headers.authorization;
  const { id } = req.params;
  const { name, age, talk } = req.body;
  validationToken(token);
  validationAge(age);
  validationTalk(talk);
  validationName(name);
  try {
  const data = await fs.readFile('talker.json', 'utf8').then((f) => JSON.parse(f));
  const dataAtt = data.map((e) => (e.id === Number(id) ? { name, age, id, talk } : e));
  await fs.writeFile('./talker.json', JSON.stringify(dataAtt));
  return res.status(200).json({ name, age, id, talk });
  } catch (err) {
    next({ status: 400, message: 'Houve algum erro' });
  }
};

module.exports = attPerson;
