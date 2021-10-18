const express = require('express');
const fs = require('fs').promises;
const { checarToken, } = require('../middleware/userValidation');

const deleteRoutes = express.Router();
const BD = './talker.json';

deleteRoutes.delete('/:id', checarToken,
async (req, res) => {
  const { id } = req.params;
  const Conteudo = JSON.parse(await fs.readFile(BD, 'utf8'));
  const index = Conteudo.filter((t) => t.id !== Number(id));
  Conteudo.push(index);
  await fs.writeFile(BD, JSON.stringify(index));

  return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

module.exports = deleteRoutes;