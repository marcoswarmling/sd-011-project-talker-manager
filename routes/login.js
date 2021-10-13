// const router = require('express').Router();
// const { fs, writeFile } = require('fs').promises;

// const writeTalker = (newFile) => writeFile('./talker.json', JSON.stringify(newFile));

// router.post('/', async (req, res) => {
//   const { email, password } = req.body;
//   const db = await fs.readFile('./talker.json', 'utf8')
//   .then((data) => JSON.parse(data));
//   const user = {
//     email, password,
//   };
//   db.push(user);
//   await writeTalker(db);
//   return res.status(201).json(db);
// });

// module.exports = router;