const searchTalk = async (req, res) => {
  const { q } = req.query;

  const talker = await fs.readFile(path, 'utf8');
  const result = JSON.parse(talker);
  const response = result.filter((value) => value.name.includes(q));

  res.status(HTTP_OK_STATUS).json(response);
};

module.exports = { searchTalk };