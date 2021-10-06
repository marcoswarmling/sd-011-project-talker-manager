const express = require('express');
const fs = require('fs').promises;

const app = express();

app.use(express.json());

function validToken(req, res, next) {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'Token não encontrado' });
  if (token.length !== 16) return res.status(401).json({ message: 'Token inválido' });
  next();
}

module.exports = app.get('/talker/search', validToken, async (req, res) => {
  const { q } = req.query;
  const readFile = await fs.readFile('./talker.json');
  const parseJson = await JSON.parse(readFile);
  const newObject = parseJson.filter((object) => object.name.includes(q));
  return res.status(200).json(newObject);
});
