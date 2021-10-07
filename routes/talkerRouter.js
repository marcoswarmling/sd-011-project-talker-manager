const express = require('express');

const router = express.Router();

const {
  getAllTalkers,
  getTalkerById,
  addTalker,
  alterTalkers,
  deleteTalker,
  searchTalker } = require('../services/talkers');

const { validateBody } = require('../middlewares/validateBody');
const { validateTokenAuthorization } = require('../middlewares/validateToken');

router.get('/', async (_req, res) => {
  const data = await getAllTalkers();
  if (!data) return res.status(200).send([]);
  return res.status(200).json(data);
});

router.get('/:search', validateTokenAuthorization, async (req, res) => {
  const { q } = req.query;
  const talker = await searchTalker(q);
  return res.status(200).send(talker);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const data = await getTalkerById(id);
  if (!data) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  return res.status(200).send(data);
});

router.post('/', validateTokenAuthorization, validateBody, async (req, res) => {
  const talkerAdded = await addTalker(req.body);
  return res.status(201).json(talkerAdded);
});

router.put('/:id', validateTokenAuthorization, validateBody, async (req, res) => {
  const { id } = req.params;
  const stats = await alterTalkers(id, req.body);
  return res.status(200).json(stats);
});

router.delete('/:id', validateTokenAuthorization, async (req, res) => {
  const { id } = req.params;
  deleteTalker(id);
  return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

module.exports = router;