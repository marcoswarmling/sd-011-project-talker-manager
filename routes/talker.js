const router = require('express').Router();
const fs = require('fs').promises;

router.get('/', async (req, res, next) => {
  try {
    const db = await fs.readFile('./talker.json', 'utf8')
    .then((data) => JSON.parse(data));
    return res.status(200).json(db).send({ menssage: 'Returned' });
  } catch (err) {
    next(err);
  }
});

// router.get('/', async (req, res, next) => {
//   try {
//     const db = await fs.readFile('./talker.json', 'utf8')
//     .then((data) => JSON.parse(data));
//     return res.status(200).json(db).send({ menssage: 'Returned' });
//   } catch (err) {
//     next(err);
//   }
// });

module.exports = router;