const fs = require('fs');
const routes = require('express').Router();
const talkerController = require('../controllers/talkerController');
const validations = require('../Helpers/validations');

const dataPath = './talker.json';

const CREATED = 201;
const HTTP_OK_STATUS = 200;

routes.get('/', talkerController.getAllTalkers);
routes.get('/:id', talkerController.getTalkersID);
routes.post('/', validations, (req, res) => {
  const rawData = fs.readFileSync(dataPath);
  const talkers = JSON.parse(rawData);
  const newTalker = req.body;
  newTalker.id = talkers.length + 1;
  talkers.push(newTalker);
  fs.writeFileSync(dataPath, JSON.stringify(talkers, null, 2));
  res.status(CREATED).json(newTalker);
});
routes.put('/:id', validations, (req, res) => {
  const rawData = fs.readFileSync(dataPath);
  const talkers = JSON.parse(rawData);
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const editedTalkerIndex = talkers.findIndex((talker) => talker.id === +id);
  talkers[editedTalkerIndex] = { id: +id, name, age, talk };
  fs.writeFileSync(dataPath, JSON.stringify(talkers, null, 2));
  res.status(HTTP_OK_STATUS).json(talkers[editedTalkerIndex]);
});
routes.delete('/:id', validations.tokenValidation, (req, res) => {
  const rawData = fs.readFileSync(dataPath);
  const talkers = JSON.parse(rawData);
  const { id } = req.params;
  const deletedTalkerIndex = talkers.findIndex((talker) => talker.id === +id);
  talkers.splice(deletedTalkerIndex, 1);
  fs.writeFileSync(dataPath, JSON.stringify(talkers, null, 2));
  res.status(HTTP_OK_STATUS).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

module.exports = routes;
