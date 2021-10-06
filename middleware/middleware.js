const searchTalk = async (req, res) => {
  const { q } = req.query;

  const talker = await fs.readFile(path, 'utf8');
  const result = JSON.parse(talker);
  const response = result.filter((value) => value.name.includes(q));

  res.status(HTTP_OK_STATUS).json(response);
};

const deleteTalker = async (req, res) => {
  const { id } = req.params;
  const talker = await fs.readFile(path, 'utf8');
  const result = JSON.parse(talker);
  const response = result.find((value) => value.id !== Number(id));
  await fs.writeFile(path, JSON.stringify(response));
  res.status(HTTP_OK_STATUS).send({ message: deleteT });
};

module.exports = { searchTalk, deleteTalker };