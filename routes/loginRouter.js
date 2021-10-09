const router = require('express').Router();

const { validNameAndEmail } = require('../middlewares/validLogin');
const { generateToken } = require('../helpers/generateToken');

const HTTP_OK_STATUS = 200;
const BAD_RESQUEST_STATUS = 400;

router.post('/', validNameAndEmail, (_req, res) => {
  try {
    const token = generateToken();
    res.status(HTTP_OK_STATUS).send({ token });
  } catch (err) {
    res.status(BAD_RESQUEST_STATUS).json({ message: err.message });
  }
});

module.exports = router;