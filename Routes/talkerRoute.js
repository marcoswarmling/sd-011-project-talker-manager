const fs = require('fs');
const routes = require('express').Router();
const talkerController = require('../controllers/talkerController');
const validations = require('../Helpers/validations');

const CREATED = 201;

routes.get('/', talkerController.getAllTalkers);
routes.get('/:id', talkerController.getTalkersID);
routes.post('/', validations, (req, res) => {
  const rawData = fs.readFileSync('./talker.json');
  const talkers = JSON.parse(rawData);
  const newTalker = req.body;
  newTalker.id = talkers.length + 1;
  talkers.push(newTalker);
  fs.writeFileSync('./talker.json', JSON.stringify(talkers, null, 2));
  res.status(CREATED).json(newTalker);
});

module.exports = routes;
