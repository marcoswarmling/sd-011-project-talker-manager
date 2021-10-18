const router = require('express').Router();
const bodyParser = require('body-parser');

router.use(bodyParser.json());

const authLogin = require('../middleware/authLoginMiddleware');
const LoginModel = require('../models/loginModel');

router.post('/', authLogin, async (_req, res) => {
  try {
    const token = LoginModel();
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
