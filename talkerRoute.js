/* 1 - Crie o endpoint GET /talker
Os seguintes pontos serão avaliados:
O endpoint deve retornar um array com todas as pessoas palestrantes cadastradas. Devendo retornar o status 200, com o seguinte corpo: */
const express = require('express');
const fs = require('file-system');

const router = express.Router();
const {
  loadSpeakers,
  validateToken,
  validateName,
  validateAge,
  validateTalk,
} = require('./utils');

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
      .status(404)
      .json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(selectedSpeaker[0]);
});

/* 4 - Crie o endpoint POST /talker
O endpoint deve ser capaz de adicionar uma nova pessoa palestrante ao seu arquivo;
A requisição deve ter o token de autenticação nos headers.
O campo name deverá ter no mínimo 3 caracteres. Ele é obrigatório.
O campo age deverá ser um inteiro e apenas pessoas maiores de idade (pelo menos 18 anos) podem ser cadastrados. Ele é obrigatório.
O campo talk deverá ser um objeto com as seguintes chaves:
A chave watchedAt deve ser uma data no formato dd/mm/aaaa.
A chave rate deve ser um inteiro de 1 à 5.
Caso esteja tudo certo, retorne o status 201 e a pessoa cadastrada.
 */
router.post(
  '/',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  (req, res) => {
    const { name, age, talk, id } = req.body;
    const { speakers } = req;
    speakers.push({ id, name, age, talk });
    fs.writeFileSync('./talker.json', JSON.stringify(speakers));
    return res.status(201).json({ id, name, age, talk });
  },
);

module.exports = router;
