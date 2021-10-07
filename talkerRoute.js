/* 1 - Crie o endpoint GET /talker
Os seguintes pontos serão avaliados:
O endpoint deve retornar um array com todas as pessoas palestrantes cadastradas. Devendo retornar o status 200, com o seguinte corpo: */

const express = require('express');

const router = express.Router();
const loadSpeakers = require('./utils');

router.use(loadSpeakers);

router.get('/', (req, res) => {
  if (req.speakers.length === 0) return res.status(200).json([]);
  res.status(200).json(req.speakers);
});

/* 2 - Crie o endpoint GET /talker/:id
O endpoint deve retornar uma pessoa palestrante com base no id da rota. Devendo retornar o status 200 ao fazer uma requisição /talker/1 */
/* Caso não seja encontrada uma pessoa palestrante com base no id da rota, o endpoint deve retornar o status 404 */
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const selectedSpeaker = req.speakers.filter((e) => e.id === parseInt(id, 10));
  if (!id || selectedSpeaker.length === 0) {
 return res
      .status(400)
      .json({ message: 'Pessoa palestrante não encontrada' }); 
}
  return res.status(200).json(selectedSpeaker[0]);
});

module.exports = router;
