const router = require('express').Router();

const fs = require('fs').promises;

const validateFileContent = async (_req, res, next) => {
  const fileContent = await fs.readFile('./talker.json');
  const people = JSON.parse(fileContent);
  if (people === []) { 
    return res.status(200).json([]);
}
  next();
};

router.get('/', validateFileContent, async (_req, res, _next) => {
  try {
    const fileContent = await fs.readFile('./talker.json');
    const people = JSON.parse(fileContent);
    return res.status(200).json(people);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;