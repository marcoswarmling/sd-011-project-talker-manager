const express = require('express');
const fs = require('fs').promises;

const app = express();
// https://www.regextester.com/99555

app.use(express.json());

function validToken(req, res, next) {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'Token não encontrado' });
  if (token.length !== 16) return res.status(401).json({ message: 'Token inválido' });
  next();
}

module.exports = app.delete('/talker/:id', validToken, async (req, res) => {
  const { id } = req.params;
  const readFile = await fs.readFile('./talker.json');
  const parseJson = await JSON.parse(readFile);
  const newObject = parseJson.filter((object) => object.id !== Number(id));
  await fs.writeFile('./talker.json', JSON.stringify(newObject));
  return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});
