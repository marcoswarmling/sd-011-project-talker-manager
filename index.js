const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs/promises");

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = "3000";

// não remova esse endpoint, e para o avaliador funcionar
app.get("/", (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

const readFile = () => {
  const file = fs.readFile("./talker", "utf-8");
  return file.then((data) => JSON.parse(data));
};

app.get("/talker", async (_req, res, _next) => {
  const list = await readFile();
  return res.status(HTTP_OK_STATUS).json(list);
});

app.listen(PORT, () => {
  console.log("Online");
});
